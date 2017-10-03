!function(root, factory, undef) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        function generateKeystreamWord() {
            var S = this._S;
            var i = this._i;
            var j = this._j;
            var keystreamWord = 0;
            for (var n = 0; 4 > n; n++) {
                i = (i + 1) % 256;
                j = (j + S[i]) % 256;
                var t = S[i];
                S[i] = S[j];
                S[j] = t;
                keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - 8 * n;
            }
            this._i = i;
            this._j = j;
            return keystreamWord;
        }
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
                var key = this._key;
                var keyWords = key.words;
                var keySigBytes = key.sigBytes;
                var S = this._S = [];
                for (var i = 0; 256 > i; i++) S[i] = i;
                for (var i = 0, j = 0; 256 > i; i++) {
                    var keyByteIndex = i % keySigBytes;
                    var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                    j = (j + S[i] + keyByte) % 256;
                    var t = S[i];
                    S[i] = S[j];
                    S[j] = t;
                }
                this._i = this._j = 0;
            },
            _doProcessBlock: function(M, offset) {
                M[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 8,
            ivSize: 0
        });
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
            cfg: RC4.cfg.extend({
                drop: 192
            }),
            _doReset: function() {
                RC4._doReset.call(this);
                for (var i = this.cfg.drop; i > 0; i--) generateKeystreamWord.call(this);
            }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
    }();
    return CryptoJS.RC4;
});