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
    this.__controllerPath = "menu";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.toggle = Ti.UI.createButton({
        title: "=",
        id: "toggle"
    });
    __parentSymbol.leftNavButton = $.__views.toggle;
    $.__views.menu && $.addTopLevelView($.__views.menu);
    $.__views.menu = Ti.UI.createView({
        zIndex: 333,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        id: "menu"
    });
    $.__views.menu && $.addTopLevelView($.__views.menu);
    $.__views.__alloyId36 = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        opacity: .3,
        id: "__alloyId36"
    });
    $.__views.menu.add($.__views.__alloyId36);
    $.__views.menubackground = Ti.UI.createView(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            zIndex: 334,
            width: "35%",
            rowHeight: 50,
            top: 0,
            left: 0,
            viewShadowColor: "rgba(0,0,0,0.3)",
            viewShadowOffset: {
                x: 10,
                y: 0
            },
            viewShadowRadius: 10,
            backgroundColor: Alloy.Globals.config.styling.baseColor,
            backgroundGradient: {
                type: "linear",
                startPoint: {
                    x: "50%",
                    y: "0%"
                },
                endPoint: {
                    x: "50%",
                    y: "100%"
                },
                colors: [ {
                    color: "rgba(0,0,0,0)",
                    offset: 0
                }, {
                    color: "rgba(0,0,0,0.3)",
                    offset: 1
                } ]
            }
        });
        Alloy.Globals.smallScreen && Alloy.deepExtend(true, o, {
            width: "65%"
        });
        Alloy.deepExtend(true, o, {
            id: "menubackground"
        });
        return o;
    }());
    $.__views.menu.add($.__views.menubackground);
    $.__views.menu_company_title = Ti.UI.createLabel({
        color: "white",
        top: 40,
        id: "menu_company_title"
    });
    $.__views.menubackground.add($.__views.menu_company_title);
    var __alloyId37 = [];
    $.__views.__alloyId38 = Ti.UI.createTableViewSection({
        id: "__alloyId38"
    });
    __alloyId37.push($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createTableViewRow({
        height: 40,
        page: "home",
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        color: "white",
        left: "24",
        text: "",
        font: {
            fontFamily: "FontAwesome",
            fontSize: "20dp"
        },
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        color: "white",
        textAlign: "left",
        left: 50,
        width: 140,
        font: {
            fontSize: "14dp"
        },
        text: L("home_page_title"),
        id: "__alloyId41"
    });
    $.__views.__alloyId39.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createTableViewRow({
        height: 40,
        page: "user_profile",
        id: "__alloyId42"
    });
    $.__views.__alloyId38.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createLabel({
        color: "white",
        left: "24",
        text: "",
        font: {
            fontFamily: "FontAwesome",
            fontSize: "20dp"
        },
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createLabel({
        color: "white",
        textAlign: "left",
        left: 50,
        width: 140,
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_page_title"),
        id: "__alloyId44"
    });
    $.__views.__alloyId42.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createTableViewRow({
        height: 40,
        page: "invoices_list",
        id: "__alloyId45"
    });
    $.__views.__alloyId38.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createLabel({
        color: "white",
        left: "24",
        text: "",
        font: {
            fontFamily: "FontAwesome",
            fontSize: "20dp"
        },
        id: "__alloyId46"
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
        color: "white",
        textAlign: "left",
        left: 50,
        width: 140,
        font: {
            fontSize: "14dp"
        },
        text: L("invoices_list_page_title"),
        id: "__alloyId47"
    });
    $.__views.__alloyId45.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createTableViewRow({
        height: 40,
        page: "complaints_list",
        id: "__alloyId48"
    });
    $.__views.__alloyId38.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createLabel({
        color: "white",
        left: "24",
        text: "",
        font: {
            fontFamily: "FontAwesome",
            fontSize: "20dp"
        },
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        color: "white",
        textAlign: "left",
        left: 50,
        width: 140,
        font: {
            fontSize: "14dp"
        },
        text: L("complaints_list_page_title"),
        id: "__alloyId50"
    });
    $.__views.__alloyId48.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createTableViewRow({
        height: 40,
        page: "documents_list",
        id: "__alloyId51"
    });
    $.__views.__alloyId38.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        color: "white",
        left: "24",
        text: "",
        font: {
            fontFamily: "FontAwesome",
            fontSize: "20dp"
        },
        id: "__alloyId52"
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createLabel({
        color: "white",
        textAlign: "left",
        left: 50,
        width: 140,
        font: {
            fontSize: "14dp"
        },
        text: L("documents_list_page_title"),
        id: "__alloyId53"
    });
    $.__views.__alloyId51.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createTableViewRow({
        height: 40,
        page: "emails_list",
        id: "__alloyId54"
    });
    $.__views.__alloyId38.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
        color: "white",
        left: "24",
        text: "",
        font: {
            fontFamily: "FontAwesome",
            fontSize: "20dp"
        },
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
        color: "white",
        textAlign: "left",
        left: 50,
        width: 140,
        font: {
            fontSize: "14dp"
        },
        text: L("emails_list_page_title"),
        id: "__alloyId56"
    });
    $.__views.__alloyId54.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createTableViewRow({
        height: 40,
        page: "contact",
        id: "__alloyId57"
    });
    $.__views.__alloyId38.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createLabel({
        color: "white",
        left: "24",
        text: "",
        font: {
            fontFamily: "FontAwesome",
            fontSize: "20dp"
        },
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
        color: "white",
        textAlign: "left",
        left: 50,
        width: 140,
        font: {
            fontSize: "14dp"
        },
        text: L("contact_page_title"),
        id: "__alloyId59"
    });
    $.__views.__alloyId57.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId60"
    });
    $.__views.__alloyId38.add($.__views.__alloyId60);
    try {
        $.addListener($.__views.__alloyId60, "click", Alloy.Globals.doLogout);
    } catch (e) {
        __defers["$.__views.__alloyId60!click!Alloy.Globals.doLogout"] = true;
    }
    $.__views.__alloyId61 = Ti.UI.createLabel({
        top: 18,
        color: "white",
        left: "24",
        text: "",
        font: {
            fontFamily: "FontAwesome",
            fontSize: "20dp"
        },
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.menuLogoutButton = Ti.UI.createLabel({
        color: "white",
        textAlign: "left",
        left: 50,
        width: 140,
        font: {
            fontSize: "12dp"
        },
        top: 20,
        id: "menuLogoutButton",
        text: L("user_profile_logout_button")
    });
    $.__views.__alloyId60.add($.__views.menuLogoutButton);
    $.__views.menuTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        rowHeight: 50,
        top: 100,
        left: 0,
        data: __alloyId37,
        id: "menuTable"
    });
    $.__views.menubackground.add($.__views.menuTable);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.menu
    });
    $.__views.fa.setParent($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.menu || (Alloy.Globals.menu = {
        position: "open",
        toggle: function(menu_element, force_toggle) {
            var self = this;
            Ti.Platform.displayCaps.platformWidth - 50;
            var toggle_to = force_toggle ? force_toggle : "open" == self.position ? "close" : "open";
            "open" == toggle_to ? menu_element.show() : menu_element.hide();
            Alloy.Globals.menu.position = "open" == self.position ? "closed" : "open";
        }
    });
    var general_company = Alloy.Globals.getSetting("general_company");
    $.menu_company_title.setText(general_company);
    $.toggle.addEventListener("click", function(trigger) {
        Alloy.Globals.menu.toggle($.menu);
    });
    $.menuTable.addEventListener("click", function(trigger) {
        if (!trigger.rowData.page) return;
        Alloy.Globals.menu.toggle($.menu, "close");
        Alloy.Globals.showPage(trigger.rowData.page);
    });
    Alloy.Globals.menu.toggle($.menu, "close");
    __defers["$.__views.__alloyId60!click!Alloy.Globals.doLogout"] && $.addListener($.__views.__alloyId60, "click", Alloy.Globals.doLogout);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;