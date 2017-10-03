!function(root, factory, undef) {
    "object" == typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512"), require("./sha384"), require("./hmac")) : "function" == typeof define && define.amd ? define([ "./core", "./x64-core", "./sha512", "./sha384", "./hmac" ], factory) : factory(root.CryptoJS);
}(this, function(CryptoJS) {
    return CryptoJS.HmacSHA384;
});