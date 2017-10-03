!function(root, factory, undef) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./sha256")) : "function" == typeof define && define.amd ? define([ "./core", "./sha256" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
                this._hash = new WordArray.init([ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ]);
            },
            _doFinalize: function() {
                var hash = SHA256._doFinalize.call(this);
                hash.sigBytes -= 4;
                return hash;
            }
        });
        C.SHA224 = SHA256._createHelper(SHA224);
        C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
    }();
    return CryptoJS.SHA224;
});