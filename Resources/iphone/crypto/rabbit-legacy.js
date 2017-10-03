!function(root, factory, undef) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        function nextState() {
            var X = this._X;
            var C = this._C;
            for (var i = 0; 8 > i; i++) C_[i] = C[i];
            C[0] = C[0] + 1295307597 + this._b | 0;
            C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; 8 > i; i++) {
                var gx = X[i] + C[i];
                var ga = 65535 & gx;
                var gb = gx >>> 16;
                var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
                var gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
                G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
                var K = this._key.words;
                var iv = this.cfg.iv;
                var X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ];
                var C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
                this._b = 0;
                for (var i = 0; 4 > i; i++) nextState.call(this);
                for (var i = 0; 8 > i; i++) C[i] ^= X[i + 4 & 7];
                if (iv) {
                    var IV = iv.words;
                    var IV_0 = IV[0];
                    var IV_1 = IV[1];
                    var i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8);
                    var i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8);
                    var i1 = i0 >>> 16 | 4294901760 & i2;
                    var i3 = i2 << 16 | 65535 & i0;
                    C[0] ^= i0;
                    C[1] ^= i1;
                    C[2] ^= i2;
                    C[3] ^= i3;
                    C[4] ^= i0;
                    C[5] ^= i1;
                    C[6] ^= i2;
                    C[7] ^= i3;
                    for (var i = 0; 4 > i; i++) nextState.call(this);
                }
            },
            _doProcessBlock: function(M, offset) {
                var X = this._X;
                nextState.call(this);
                S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
                S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
                S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
                S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
                for (var i = 0; 4 > i; i++) {
                    S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8);
                    M[offset + i] ^= S[i];
                }
            },
            blockSize: 4,
            ivSize: 2
        });
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
    }();
    return CryptoJS.RabbitLegacy;
});