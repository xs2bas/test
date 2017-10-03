function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "invoices/details";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.invoice = Alloy.createModel("invoice");
    $.__views.details = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "details"
    });
    $.__views.details && $.addTopLevelView($.__views.details);
    $.__views.webview = Ti.UI.createWebView({
        id: "webview"
    });
    $.__views.details.add($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var secret = Titanium.Utils.sha1(args.data.attributes.id_transaction + "_secret_" + args.data.attributes.hash);
    $.webview.setUrl(Alloy.Globals.getBackofficeUrl() + "invoice/export/hash/" + args.data.attributes.hash + "/s/" + secret + "/");
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;