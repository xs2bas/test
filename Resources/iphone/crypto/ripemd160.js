!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function(Math) {
        function f1(x, y, z) {
            return x ^ y ^ z;
        }
        function f2(x, y, z) {
            return x & y | ~x & z;
        }
        function f3(x, y, z) {
            return (x | ~y) ^ z;
        }
        function f4(x, y, z) {
            return x & z | y & ~z;
        }
        function f5(x, y, z) {
            return x ^ (y | ~z);
        }
        function rotl(x, n) {
            return x << n | x >>> 32 - n;
        }
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var _zl = WordArray.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ]);
        var _zr = WordArray.create([ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ]);
        var _sl = WordArray.create([ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ]);
        var _sr = WordArray.create([ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ]);
        var _hl = WordArray.create([ 0, 1518500249, 1859775393, 2400959708, 2840853838 ]);
        var _hr = WordArray.create([ 1352829926, 1548603684, 1836072691, 2053994217, 0 ]);
        var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
                this._hash = WordArray.create([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
            },
            _doProcessBlock: function(M, offset) {
                for (var i = 0; 16 > i; i++) {
                    var offset_i = offset + i;
                    var M_offset_i = M[offset_i];
                    M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
                }
                var H = this._hash.words;
                var hl = _hl.words;
                var hr = _hr.words;
                var zl = _zl.words;
                var zr = _zr.words;
                var sl = _sl.words;
                var sr = _sr.words;
                var al, bl, cl, dl, el;
                var ar, br, cr, dr, er;
                ar = al = H[0];
                br = bl = H[1];
                cr = cl = H[2];
                dr = dl = H[3];
                er = el = H[4];
                var t;
                for (var i = 0; 80 > i; i += 1) {
                    t = al + M[offset + zl[i]] | 0;
                    t += 16 > i ? f1(bl, cl, dl) + hl[0] : 32 > i ? f2(bl, cl, dl) + hl[1] : 48 > i ? f3(bl, cl, dl) + hl[2] : 64 > i ? f4(bl, cl, dl) + hl[3] : f5(bl, cl, dl) + hl[4];
                    t = 0 | t;
                    t = rotl(t, sl[i]);
                    t = t + el | 0;
                    al = el;
                    el = dl;
                    dl = rotl(cl, 10);
                    cl = bl;
                    bl = t;
                    t = ar + M[offset + zr[i]] | 0;
                    t += 16 > i ? f5(br, cr, dr) + hr[0] : 32 > i ? f4(br, cr, dr) + hr[1] : 48 > i ? f3(br, cr, dr) + hr[2] : 64 > i ? f2(br, cr, dr) + hr[3] : f1(br, cr, dr) + hr[4];
                    t = 0 | t;
                    t = rotl(t, sr[i]);
                    t = t + er | 0;
                    ar = er;
                    er = dr;
                    dr = rotl(cr, 10);
                    cr = br;
                    br = t;
                }
                t = H[1] + cl + dr | 0;
                H[1] = H[2] + dl + er | 0;
                H[2] = H[3] + el + ar | 0;
                H[3] = H[4] + al + br | 0;
                H[4] = H[0] + bl + cr | 0;
                H[0] = t;
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = 8 * this._nDataBytes;
                var nBitsLeft = 8 * data.sigBytes;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = 16711935 & (nBitsTotal << 8 | nBitsTotal >>> 24) | 4278255360 & (nBitsTotal << 24 | nBitsTotal >>> 8);
                data.sigBytes = 4 * (dataWords.length + 1);
                this._process();
                var hash = this._hash;
                var H = hash.words;
                for (var i = 0; 5 > i; i++) {
                    var H_i = H[i];
                    H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
                }
                return hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
        C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
    }(Math);
    return CryptoJS.RIPEMD160;
});