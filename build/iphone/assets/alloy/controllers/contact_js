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
    this.__controllerPath = "contact";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("settings");
    $.__views.main = Ti.UI.createView({
        top: 0,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    var __alloyId11 = [];
    $.__views.__alloyId12 = Ti.UI.createTableViewSection({
        id: "__alloyId12"
    });
    __alloyId11.push($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.company = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "company"
    });
    $.__views.__alloyId13.add($.__views.company);
    $.__views.__alloyId14 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId14"
    });
    $.__views.__alloyId12.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: "E-mail: ",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.email = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "email"
    });
    $.__views.__alloyId14.add($.__views.email);
    $.__views.__alloyId16 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId16"
    });
    $.__views.__alloyId12.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: "Website: ",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.website = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "website"
    });
    $.__views.__alloyId16.add($.__views.website);
    $.__views.__alloyId18 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId18"
    });
    $.__views.__alloyId12.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("contact_page_phone"),
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.phone = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "phone"
    });
    $.__views.__alloyId18.add($.__views.phone);
    $.__views.__alloyId20 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId20"
    });
    $.__views.__alloyId12.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("contact_page_emergency_phone"),
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.project_emergency_phone = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "project_emergency_phone"
    });
    $.__views.__alloyId20.add($.__views.project_emergency_phone);
    $.__views.__alloyId22 = Ti.UI.createTableViewRow({
        height: 50,
        id: "__alloyId22"
    });
    $.__views.__alloyId12.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        top: 10,
        text: L("contact_page_address"),
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.address = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "address",
        top: 5
    });
    $.__views.__alloyId22.add($.__views.address);
    $.__views.__alloyId10 = Ti.UI.createTableView({
        data: __alloyId11,
        id: "__alloyId10"
    });
    $.__views.main.add($.__views.__alloyId10);
    $.__views.__alloyId24 = Alloy.createController("buttonBar", {
        id: "__alloyId24",
        __parentSymbol: $.__views.main
    });
    $.__views.__alloyId24.setParent($.__views.main);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.phone.text = Alloy.Globals.getSetting("general_phone");
    $.company.text = Alloy.Globals.getSetting("general_company");
    $.website.text = Alloy.Globals.getSetting("general_website");
    $.address.text = Alloy.Globals.getSetting("general_address_street") + " " + Alloy.Globals.getSetting("general_address_number") + "\n" + Alloy.Globals.getSetting("general_address_zipcode") + " " + Alloy.Globals.getSetting("general_address_city");
    var users_col = Alloy.createCollection("user");
    users_col.fetch({
        success: function(col) {
            _.each(col.models, function(user_row) {
                $.project_emergency_phone.text = user_row.get("project_emergency_phone");
                $.email.text = user_row.get("corporation_email");
            });
        }
    });
    $.email.addEventListener("click", function() {
        Ti.Platform.openURL("mailto:" + $.email.text);
    });
    $.phone.addEventListener("click", function() {
        Ti.Platform.openURL("tel:" + $.phone.text.replace(/\D/g, ""));
    });
    $.project_emergency_phone.addEventListener("click", function() {
        Ti.Platform.openURL("tel:" + $.project_emergency_phone.text.replace(/\D/g, ""));
    });
    $.website.addEventListener("click", function() {
        Ti.Platform.openURL("http://" + $.website.text);
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;