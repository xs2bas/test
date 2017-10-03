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
    this.__controllerPath = "loader";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.activityIndicator = Ti.UI.createView({
        visible: false,
        zIndex: 333,
        id: "activityIndicator"
    });
    $.__views.activityIndicator && $.addTopLevelView($.__views.activityIndicator);
    $.__views.activityIndicatorBackground = Ti.UI.createView({
        left: "20%",
        top: "50%",
        backgroundColor: "#FFFFFF",
        borderRadius: 6,
        opacity: .3,
        width: 250,
        height: 150,
        id: "activityIndicatorBackground"
    });
    $.__views.activityIndicator.add($.__views.activityIndicatorBackground);
    $.__views.activityIndicatorText = Ti.UI.createActivityIndicator({
        left: "20%",
        top: "55%",
        color: "white",
        width: 200,
        height: 50,
        id: "activityIndicatorText",
        message: "test"
    });
    $.__views.activityIndicator.add($.__views.activityIndicatorText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.loader || (Alloy.Globals.loader = {
        show: function(message) {
            $.activityIndicatorText.message = message;
            $.activityIndicator.show();
            $.activityIndicatorText.show();
        },
        hide: function() {
            $.activityIndicator.hide();
            $.activityIndicatorText.hide();
        }
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;