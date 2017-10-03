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
    this.__controllerPath = "home";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.main = Ti.UI.createView({
        top: 0,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.backgroundImage = Alloy.createController("backgroundImage", {
        id: "backgroundImage",
        __parentSymbol: $.__views.main
    });
    $.__views.backgroundImage.setParent($.__views.main);
    $.__views.__alloyId25 = Ti.UI.createView({
        top: "33%",
        backgroundColor: "white",
        opacity: .8,
        id: "__alloyId25"
    });
    $.__views.main.add($.__views.__alloyId25);
    $.__views.logo = Ti.UI.createImageView({
        height: "20%",
        top: 5,
        bottom: 5,
        id: "logo"
    });
    $.__views.__alloyId25.add($.__views.logo);
    $.__views.title = Ti.UI.createLabel({
        top: "25%",
        width: "90%",
        textAlign: "left",
        font: {
            fontWeight: "bold",
            fontSize: "16dp"
        },
        id: "title"
    });
    $.__views.__alloyId25.add($.__views.title);
    $.__views.message = Ti.UI.createLabel({
        top: "30%",
        width: "90%",
        textAlign: "left",
        font: {
            fontSize: "12dp"
        },
        id: "message",
        text: L("home_message")
    });
    $.__views.__alloyId25.add($.__views.message);
    $.__views.__alloyId26 = Alloy.createController("buttonBar", {
        id: "__alloyId26",
        __parentSymbol: $.__views.main
    });
    $.__views.__alloyId26.setParent($.__views.main);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var general_company = Alloy.Globals.getSetting("general_company");
    Alloy.Globals.current_window.setTitle(general_company);
    $.title.setText(String.format(L("home_message_title"), general_company));
    var users_col = Alloy.createCollection("user");
    users_col.fetch({
        success: function(col) {
            _.each(col.models, function(user_row) {
                (logo = user_row.get("corporation_logo")) && $.logo.setImage(Alloy.Globals.getBackofficeUrl() + "media/images/" + logo);
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;