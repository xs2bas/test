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
    this.__controllerPath = "buttonBar";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.buttonBar = Ti.UI.createView({
        bottom: 0,
        height: 80,
        backgroundColor: "white",
        viewShadowColor: "#e7e7e7",
        viewShadowOffset: {
            x: 0,
            y: -3
        },
        viewShadowRadius: 3,
        id: "buttonBar"
    });
    $.__views.buttonBar && $.addTopLevelView($.__views.buttonBar);
    $.__views.emailButton = Ti.UI.createView({
        width: "20%",
        height: "100%",
        left: "4%",
        id: "emailButton"
    });
    $.__views.buttonBar.add($.__views.emailButton);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        top: "20%",
        color: Alloy.Globals.config.styling.accentColor,
        font: {
            fontSize: "34dp"
        },
        icon: "fa-envelope",
        id: "__alloyId0"
    });
    $.__views.emailButton.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        top: "70%",
        textAlign: "center",
        color: Alloy.Globals.config.styling.baseColor,
        font: {
            fontSize: "12dp"
        },
        text: L("emails_list_page_title"),
        id: "__alloyId1"
    });
    $.__views.emailButton.add($.__views.__alloyId1);
    $.__views.invoiceButton = Ti.UI.createView({
        width: "20%",
        height: "100%",
        left: "28%",
        id: "invoiceButton"
    });
    $.__views.buttonBar.add($.__views.invoiceButton);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        top: "20%",
        color: Alloy.Globals.config.styling.accentColor,
        font: {
            fontSize: "34dp"
        },
        icon: "fa-file-text",
        id: "__alloyId2"
    });
    $.__views.invoiceButton.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        top: "70%",
        textAlign: "center",
        color: Alloy.Globals.config.styling.baseColor,
        font: {
            fontSize: "12dp"
        },
        text: L("invoices_list_page_title"),
        id: "__alloyId3"
    });
    $.__views.invoiceButton.add($.__views.__alloyId3);
    $.__views.complaintsButton = Ti.UI.createView({
        width: "20%",
        height: "100%",
        left: "52%",
        id: "complaintsButton"
    });
    $.__views.buttonBar.add($.__views.complaintsButton);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        top: "20%",
        color: Alloy.Globals.config.styling.accentColor,
        font: {
            fontSize: "34dp"
        },
        icon: "fa-exclamation-circle",
        id: "__alloyId4"
    });
    $.__views.complaintsButton.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        top: "70%",
        textAlign: "center",
        color: Alloy.Globals.config.styling.baseColor,
        font: {
            fontSize: "12dp"
        },
        text: L("complaints_list_page_title"),
        id: "__alloyId5"
    });
    $.__views.complaintsButton.add($.__views.__alloyId5);
    $.__views.contactButton = Ti.UI.createView({
        width: "20%",
        height: "100%",
        left: "76%",
        id: "contactButton"
    });
    $.__views.buttonBar.add($.__views.contactButton);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        top: "20%",
        color: Alloy.Globals.config.styling.accentColor,
        font: {
            fontSize: "34dp"
        },
        icon: "fa-phone",
        id: "__alloyId6"
    });
    $.__views.contactButton.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        top: "70%",
        textAlign: "center",
        color: Alloy.Globals.config.styling.baseColor,
        font: {
            fontSize: "12dp"
        },
        text: L("contact_page_title"),
        id: "__alloyId7"
    });
    $.__views.contactButton.add($.__views.__alloyId7);
    $.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
        id: "fa",
        __parentSymbol: $.__views.buttonBar
    });
    $.__views.fa.setParent($.__views.buttonBar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.emailButton.addEventListener("click", function() {
        Alloy.Globals.showPage("emails_list");
    });
    $.invoiceButton.addEventListener("click", function() {
        Alloy.Globals.showPage("invoices_list");
    });
    $.complaintsButton.addEventListener("click", function() {
        Alloy.Globals.showPage("complaints_list");
    });
    $.contactButton.addEventListener("click", function() {
        Alloy.Globals.showPage("contact");
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;