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
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.page_user_login_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "page_user_login_window",
        title: L("login_page_title")
    });
    $.__views.__alloyId27 = Alloy.createController("loader", {
        id: "__alloyId27",
        __parentSymbol: $.__views.page_user_login_window
    });
    $.__views.__alloyId27.setParent($.__views.page_user_login_window);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.page_user_login_window
    });
    $.__views.fa.setParent($.__views.page_user_login_window);
    $.__views.page_user_login = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        backgroundColor: "white",
        window: $.__views.page_user_login_window,
        id: "page_user_login"
    });
    $.__views.page_user_login && $.addTopLevelView($.__views.page_user_login);
    $.__views.page_home_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "page_home_window"
    });
    $.__views.__alloyId28 = Alloy.createController("menu", {
        id: "__alloyId28",
        __parentSymbol: $.__views.page_home_window
    });
    $.__views.__alloyId28.setParent($.__views.page_home_window);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.page_home_window
    });
    $.__views.fa.setParent($.__views.page_home_window);
    $.__views.page_home = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        backgroundColor: "white",
        window: $.__views.page_home_window,
        id: "page_home"
    });
    $.__views.page_home && $.addTopLevelView($.__views.page_home);
    $.__views.page_user_profile_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "page_user_profile_window",
        title: L("user_profile_page_title")
    });
    $.__views.__alloyId29 = Alloy.createController("menu", {
        id: "__alloyId29",
        __parentSymbol: $.__views.page_user_profile_window
    });
    $.__views.__alloyId29.setParent($.__views.page_user_profile_window);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.page_user_profile_window
    });
    $.__views.fa.setParent($.__views.page_user_profile_window);
    $.__views.page_user_profile = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        backgroundColor: "white",
        window: $.__views.page_user_profile_window,
        id: "page_user_profile"
    });
    $.__views.page_user_profile && $.addTopLevelView($.__views.page_user_profile);
    $.__views.page_invoices_list_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "page_invoices_list_window",
        title: L("invoices_list_page_title")
    });
    $.__views.__alloyId30 = Alloy.createController("menu", {
        id: "__alloyId30",
        __parentSymbol: $.__views.page_invoices_list_window
    });
    $.__views.__alloyId30.setParent($.__views.page_invoices_list_window);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.page_invoices_list_window
    });
    $.__views.fa.setParent($.__views.page_invoices_list_window);
    $.__views.page_invoices_list = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        backgroundColor: "white",
        window: $.__views.page_invoices_list_window,
        id: "page_invoices_list"
    });
    $.__views.page_invoices_list && $.addTopLevelView($.__views.page_invoices_list);
    $.__views.page_documents_list_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "page_documents_list_window",
        title: L("documents_list_page_title")
    });
    $.__views.__alloyId31 = Alloy.createController("menu", {
        id: "__alloyId31",
        __parentSymbol: $.__views.page_documents_list_window
    });
    $.__views.__alloyId31.setParent($.__views.page_documents_list_window);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.page_documents_list_window
    });
    $.__views.fa.setParent($.__views.page_documents_list_window);
    $.__views.page_documents_list = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        backgroundColor: "white",
        window: $.__views.page_documents_list_window,
        id: "page_documents_list"
    });
    $.__views.page_documents_list && $.addTopLevelView($.__views.page_documents_list);
    $.__views.page_emails_list_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "page_emails_list_window",
        title: L("emails_list_page_title")
    });
    $.__views.__alloyId32 = Alloy.createController("menu", {
        id: "__alloyId32",
        __parentSymbol: $.__views.page_emails_list_window
    });
    $.__views.__alloyId32.setParent($.__views.page_emails_list_window);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.page_emails_list_window
    });
    $.__views.fa.setParent($.__views.page_emails_list_window);
    $.__views.page_emails_list = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        backgroundColor: "white",
        window: $.__views.page_emails_list_window,
        id: "page_emails_list"
    });
    $.__views.page_emails_list && $.addTopLevelView($.__views.page_emails_list);
    $.__views.page_complaints_list_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "page_complaints_list_window",
        title: L("complaints_list_page_title")
    });
    $.__views.__alloyId33 = Alloy.createController("menu", {
        id: "__alloyId33",
        __parentSymbol: $.__views.page_complaints_list_window
    });
    $.__views.__alloyId33.setParent($.__views.page_complaints_list_window);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.page_complaints_list_window
    });
    $.__views.fa.setParent($.__views.page_complaints_list_window);
    $.__views.page_complaints_list = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        backgroundColor: "white",
        window: $.__views.page_complaints_list_window,
        id: "page_complaints_list"
    });
    $.__views.page_complaints_list && $.addTopLevelView($.__views.page_complaints_list);
    $.__views.page_contact_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "page_contact_window",
        title: L("contact_page_title")
    });
    $.__views.__alloyId34 = Alloy.createController("menu", {
        id: "__alloyId34",
        __parentSymbol: $.__views.page_contact_window
    });
    $.__views.__alloyId34.setParent($.__views.page_contact_window);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.page_contact_window
    });
    $.__views.fa.setParent($.__views.page_contact_window);
    $.__views.page_contact = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        backgroundColor: "white",
        window: $.__views.page_contact_window,
        id: "page_contact"
    });
    $.__views.page_contact && $.addTopLevelView($.__views.page_contact);
    $.__views.offline_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "offline_window",
        modal: 1,
        title: "Offline"
    });
    $.__views.offline_window && $.addTopLevelView($.__views.offline_window);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Offline",
        top: 100,
        id: "__alloyId35"
    });
    $.__views.offline_window.add($.__views.__alloyId35);
    $.__views.check_online_button = Ti.UI.createButton({
        id: "check_online_button",
        title: "Verbinden"
    });
    $.__views.offline_window.add($.__views.check_online_button);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.offline_window
    });
    $.__views.fa.setParent($.__views.offline_window);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.toggleOfflineWindow = function(online_callback) {
        Alloy.Globals.checkConnection(function(status_changed) {
            if (status_changed) {
                $.offline_window.close();
                Alloy.Globals.current_nav_window.show();
            }
            online_callback && online_callback(status_changed);
        }, function(status_changed) {
            if (status_changed) {
                $.offline_window.open();
                Alloy.Globals.current_nav_window.hide();
                Alloy.Globals.loader.hide();
            }
        });
    };
    $.check_online_button.addEventListener("click", function() {
        Alloy.Globals.toggleOfflineWindow();
    });
    Alloy.Globals.showPage = function(short_page_name) {
        var pages = [ "user_login", "home", "user_profile", "invoices_list", "documents_list", "emails_list", "complaints_list", "contact" ];
        var page_name = "page_" + short_page_name;
        for (var i = 0, len = pages.length; len > i; i++) {
            page_element = $["page_" + pages[i]];
            page_window_element = $["page_" + pages[i] + "_window"];
            if (page_element.id == page_name) {
                page_element.open();
                page_element.show();
                var controller_name = false === short_page_name.indexOf("_") ? short_page_name : short_page_name.replace("_", "/");
                Alloy.Globals.current_nav_window = page_element;
                Alloy.Globals.current_window = page_window_element;
                page_window_element.add(Alloy.createController(controller_name).getView());
            } else {
                page_element.close();
                page_element.hide();
            }
        }
    };
    Alloy.Globals.initializeSettings(function() {
        Alloy.Globals.keychainStorage.hasProperty("userdata_id") ? Alloy.Globals.showPage("home") : Alloy.Globals.showPage("user_login");
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;