!function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    !function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        C_enc.Base64 = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var map = this._map;
                wordArray.clamp();
                var base64Chars = [];
                for (var i = 0; sigBytes > i; i += 3) {
                    var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                    var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                    var triplet = byte1 << 16 | byte2 << 8 | byte3;
                    for (var j = 0; 4 > j && sigBytes > i + .75 * j; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
                var paddingChar = map.charAt(64);
                if (paddingChar) while (base64Chars.length % 4) base64Chars.push(paddingChar);
                return base64Chars.join("");
            },
            parse: function(base64Str) {
                var base64StrLength = base64Str.length;
                var map = this._map;
                var paddingChar = map.charAt(64);
                if (paddingChar) {
                    var paddingIndex = base64Str.indexOf(paddingChar);
                    -1 != paddingIndex && (base64StrLength = paddingIndex);
                }
                var words = [];
                var nBytes = 0;
                for (var i = 0; base64StrLength > i; i++) if (i % 4) {
                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2;
                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;
                    words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
                    nBytes++;
                }
                return WordArray.create(words, nBytes);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
    }();
    return CryptoJS.enc.Base64;
});