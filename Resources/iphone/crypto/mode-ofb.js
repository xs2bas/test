!function(root, factory, undef) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    CryptoJS.mode.OFB = function() {
        var OFB = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var iv = this._iv;
                var keystream = this._keystream;
                if (iv) {
                    keystream = this._keystream = iv.slice(0);
                    this._iv = void 0;
                }
                cipher.encryptBlock(keystream, 0);
                for (var i = 0; blockSize > i; i++) words[offset + i] ^= keystream[i];
            }
        });
        OFB.Decryptor = Encryptor;
        return OFB;
    }();
    return CryptoJS.mode.OFB;
});