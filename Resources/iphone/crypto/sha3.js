!function(root, factory, undef) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core")) : "function" == typeof define && define.amd ? define([ "./core", "./x64-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var C_algo = C.algo;
        var RHO_OFFSETS = [];
        var PI_INDEXES = [];
        var ROUND_CONSTANTS = [];
        !function() {
            var x = 1, y = 0;
            for (var t = 0; 24 > t; t++) {
                RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
                var newX = y % 5;
                var newY = (2 * x + 3 * y) % 5;
                x = newX;
                y = newY;
            }
            for (var x = 0; 5 > x; x++) for (var y = 0; 5 > y; y++) PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
            var LFSR = 1;
            for (var i = 0; 24 > i; i++) {
                var roundConstantMsw = 0;
                var roundConstantLsw = 0;
                for (var j = 0; 7 > j; j++) {
                    if (1 & LFSR) {
                        var bitPosition = (1 << j) - 1;
                        32 > bitPosition ? roundConstantLsw ^= 1 << bitPosition : roundConstantMsw ^= 1 << bitPosition - 32;
                    }
                    128 & LFSR ? LFSR = LFSR << 1 ^ 113 : LFSR <<= 1;
                }
                ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
        }();
        var T = [];
        !function() {
            for (var i = 0; 25 > i; i++) T[i] = X64Word.create();
        }();
        var SHA3 = C_algo.SHA3 = Hasher.extend({
            cfg: Hasher.cfg.extend({
                outputLength: 512
            }),
            _doReset: function() {
                var state = this._state = [];
                for (var i = 0; 25 > i; i++) state[i] = new X64Word.init();
                this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M, offset) {
                var state = this._state;
                var nBlockSizeLanes = this.blockSize / 2;
                for (var i = 0; nBlockSizeLanes > i; i++) {
                    var M2i = M[offset + 2 * i];
                    var M2i1 = M[offset + 2 * i + 1];
                    M2i = 16711935 & (M2i << 8 | M2i >>> 24) | 4278255360 & (M2i << 24 | M2i >>> 8);
                    M2i1 = 16711935 & (M2i1 << 8 | M2i1 >>> 24) | 4278255360 & (M2i1 << 24 | M2i1 >>> 8);
                    var lane = state[i];
                    lane.high ^= M2i1;
                    lane.low ^= M2i;
                }
                for (var round = 0; 24 > round; round++) {
                    for (var x = 0; 5 > x; x++) {
                        var tMsw = 0, tLsw = 0;
                        for (var y = 0; 5 > y; y++) {
                            var lane = state[x + 5 * y];
                            tMsw ^= lane.high;
                            tLsw ^= lane.low;
                        }
                        var Tx = T[x];
                        Tx.high = tMsw;
                        Tx.low = tLsw;
                    }
                    for (var x = 0; 5 > x; x++) {
                        var Tx4 = T[(x + 4) % 5];
                        var Tx1 = T[(x + 1) % 5];
                        var Tx1Msw = Tx1.high;
                        var Tx1Lsw = Tx1.low;
                        var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                        var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                        for (var y = 0; 5 > y; y++) {
                            var lane = state[x + 5 * y];
                            lane.high ^= tMsw;
                            lane.low ^= tLsw;
                        }
                    }
                    for (var laneIndex = 1; 25 > laneIndex; laneIndex++) {
                        var lane = state[laneIndex];
                        var laneMsw = lane.high;
                        var laneLsw = lane.low;
                        var rhoOffset = RHO_OFFSETS[laneIndex];
                        if (32 > rhoOffset) {
                            var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                            var tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                        } else {
                            var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                            var tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                        }
                        var TPiLane = T[PI_INDEXES[laneIndex]];
                        TPiLane.high = tMsw;
                        TPiLane.low = tLsw;
                    }
                    var T0 = T[0];
                    var state0 = state[0];
                    T0.high = state0.high;
                    T0.low = state0.low;
                    for (var x = 0; 5 > x; x++) for (var y = 0; 5 > y; y++) {
                        var laneIndex = x + 5 * y;
                        var lane = state[laneIndex];
                        var TLane = T[laneIndex];
                        var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                        var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                        lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                        lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                    }
                    var lane = state[0];
                    var roundConstant = ROUND_CONSTANTS[round];
                    lane.high ^= roundConstant.high;
                    lane.low ^= roundConstant.low;
                }
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                8 * this._nDataBytes;
                var nBitsLeft = 8 * data.sigBytes;
                var blockSizeBits = 32 * this.blockSize;
                dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
                dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
                data.sigBytes = 4 * dataWords.length;
                this._process();
                var state = this._state;
                var outputLengthBytes = this.cfg.outputLength / 8;
                var outputLengthLanes = outputLengthBytes / 8;
                var hashWords = [];
                for (var i = 0; outputLengthLanes > i; i++) {
                    var lane = state[i];
                    var laneMsw = lane.high;
                    var laneLsw = lane.low;
                    laneMsw = 16711935 & (laneMsw << 8 | laneMsw >>> 24) | 4278255360 & (laneMsw << 24 | laneMsw >>> 8);
                    laneLsw = 16711935 & (laneLsw << 8 | laneLsw >>> 24) | 4278255360 & (laneLsw << 24 | laneLsw >>> 8);
                    hashWords.push(laneLsw);
                    hashWords.push(laneMsw);
                }
                return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                var state = clone._state = this._state.slice(0);
                for (var i = 0; 25 > i; i++) state[i] = state[i].clone();
                return clone;
            }
        });
        C.SHA3 = Hasher._createHelper(SHA3);
        C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
    }(Math);
    return CryptoJS.SHA3;
});