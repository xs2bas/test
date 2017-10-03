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
    this.__controllerPath = "documents/details";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.document = Alloy.createModel("documents");
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
    Alloy.Globals.httpRequestAuthenticated("document/download/rest/1/id/" + args.data.attributes.id + "/version/" + args.data.attributes.version_id + "/", {
        returnData: true,
        onSuccess: function(result) {
            $.webview.setData(result);
        }
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;