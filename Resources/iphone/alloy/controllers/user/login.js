function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function tryLogin() {
        Alloy.Globals.loader.show(L("login_busy"));
        Alloy.Globals.toggleOfflineWindow(function() {
            doLogin();
        });
    }
    function showLoginError() {
        Ti.UI.createAlertDialog({
            buttonNames: [ "Ok" ],
            title: L("login_unable_title"),
            message: L("login_unable_description")
        }).show();
    }
    function doLogin() {
        Alloy.Globals.keychainStorage.setString("userdata_username", $.username.value);
        Alloy.Globals.keychainStorage.setString("userdata_password", Titanium.Utils.sha1($.password.value).toUpperCase());
        var users = Alloy.createCollection("user");
        users.config.headers = Alloy.Globals.getAuthenticationHeaders();
        Alloy.Globals.updateInitializedCollections();
        $.password.value = "";
        users.fetch({
            success: function(result) {
                Alloy.Globals.loader.hide();
                if (1 != users.models.length) {
                    showLoginError();
                    return false;
                }
                Alloy.Globals.keychainStorage.setInt("userdata_id", users.models[0].id);
                Alloy.Globals.showPage("home");
            },
            error: function() {
                Alloy.Globals.loader.hide();
                showLoginError();
            }
        });
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "user/login";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.user = Alloy.createModel("user");
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
    $.__views.__alloyId198 = Ti.UI.createView({
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        opacity: .3,
        top: "10%",
        width: "80%",
        height: "33%",
        id: "__alloyId198"
    });
    $.__views.main.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createView({
        top: "10%",
        width: "80%",
        height: "33%",
        zIndex: 1e3,
        id: "__alloyId199"
    });
    $.__views.main.add($.__views.__alloyId199);
    $.__views.__alloyId200 = Ti.UI.createLabel({
        left: "10%",
        width: "80%",
        color: "#FFFFFF",
        text: L("login_login"),
        top: 20,
        id: "__alloyId200"
    });
    $.__views.__alloyId199.add($.__views.__alloyId200);
    $.__views.username = Ti.UI.createTextField({
        height: 30,
        left: "10%",
        width: "80%",
        paddingLeft: 10,
        font: {
            fontSize: "14dp"
        },
        backgroundColor: "#FFFFFF",
        top: 50,
        id: "username",
        hintText: L("login_username")
    });
    $.__views.__alloyId199.add($.__views.username);
    tryLogin ? $.addListener($.__views.username, "return", tryLogin) : __defers["$.__views.username!return!tryLogin"] = true;
    $.__views.password = Ti.UI.createTextField({
        height: 30,
        left: "10%",
        width: "80%",
        paddingLeft: 10,
        font: {
            fontSize: "14dp"
        },
        backgroundColor: "#FFFFFF",
        top: 90,
        id: "password",
        passwordMask: true,
        hintText: L("login_password")
    });
    $.__views.__alloyId199.add($.__views.password);
    tryLogin ? $.addListener($.__views.password, "return", tryLogin) : __defers["$.__views.password!return!tryLogin"] = true;
    $.__views.__alloyId201 = Ti.UI.createButton({
        left: "10%",
        width: "80%",
        color: "#FFFFFF",
        top: 150,
        title: L("login_login"),
        id: "__alloyId201"
    });
    $.__views.__alloyId199.add($.__views.__alloyId201);
    tryLogin ? $.addListener($.__views.__alloyId201, "click", tryLogin) : __defers["$.__views.__alloyId201!click!tryLogin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Titanium.App.addEventListener("resume", function() {
        Alloy.Globals.toggleOfflineWindow();
    });
    Alloy.Globals.toggleOfflineWindow();
    Alloy.Globals.loader.hide();
    $.username.value = Alloy.Globals.keychainStorage.getString("userdata_username");
    Alloy.createCollection("user");
    __defers["$.__views.username!return!tryLogin"] && $.addListener($.__views.username, "return", tryLogin);
    __defers["$.__views.password!return!tryLogin"] && $.addListener($.__views.password, "return", tryLogin);
    __defers["$.__views.__alloyId201!click!tryLogin"] && $.addListener($.__views.__alloyId201, "click", tryLogin);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;