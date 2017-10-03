function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addPicture(picture_id, first_picture) {
        var picture_section_index = 1;
        $.pictures_section;
        var table = $.complaint_details_table;
        var row = Titanium.UI.createTableViewRow({
            name: picture_id
        });
        activityIndicator.show();
        first_picture && row.add(Titanium.UI.createLabel({
            left: 20,
            width: "33%",
            font: {
                fontSize: "14dp"
            },
            text: L("complaints_add_pictures")
        }));
        var imageview = Titanium.UI.createImageView({
            image: Alloy.Globals.getBackofficeUrl() + "complaint/get-picture/id/" + picture_id + "/rest/1/",
            height: 100,
            left: "33%",
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10
        });
        imageview.addEventListener("load", function() {
            activityIndicator.hide();
        });
        row.add(imageview);
        imageview.addEventListener("click", function() {
            var imageController = Alloy.createController("complaints/showImage", {
                picture_id: picture_id
            });
            Alloy.Globals.current_nav_window.openWindow(imageController.getView());
        });
        Alloy.Globals.appendRowToSection(table, row, picture_section_index);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "complaints/details";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.complaint = Alloy.createModel("complaint");
    $.__views.complaint_window = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "complaint_window"
    });
    $.__views.complaint_window && $.addTopLevelView($.__views.complaint_window);
    var __alloyId84 = [];
    $.__views.__alloyId85 = Ti.UI.createTableViewSection({
        id: "__alloyId85"
    });
    __alloyId84.push($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId86"
    });
    $.__views.__alloyId85.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("complaints_add_title"),
        id: "__alloyId87"
    });
    $.__views.__alloyId86.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId88"
    });
    $.__views.__alloyId86.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId89"
    });
    $.__views.__alloyId85.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("complaints_add_is_complaint"),
        id: "__alloyId90"
    });
    $.__views.__alloyId89.add($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId91"
    });
    $.__views.__alloyId89.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId92"
    });
    $.__views.__alloyId85.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("complaints_details_date"),
        id: "__alloyId93"
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId94"
    });
    $.__views.__alloyId92.add($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId95"
    });
    $.__views.__alloyId85.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("complaints_details_status"),
        id: "__alloyId96"
    });
    $.__views.__alloyId95.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId97"
    });
    $.__views.__alloyId95.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        bottom: 10,
        id: "__alloyId98"
    });
    $.__views.__alloyId85.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        top: 0,
        text: L("complaints_add_description"),
        id: "__alloyId99"
    });
    $.__views.__alloyId98.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        top: 0,
        id: "__alloyId100"
    });
    $.__views.__alloyId98.add($.__views.__alloyId100);
    $.__views.pictures_section = Ti.UI.createTableViewSection({
        id: "pictures_section"
    });
    __alloyId84.push($.__views.pictures_section);
    $.__views.complaint_details_table = Ti.UI.createTableView({
        data: __alloyId84,
        id: "complaint_details_table"
    });
    $.__views.complaint_window.add($.__views.complaint_details_table);
    $.__views.__alloyId101 = Alloy.createController("buttonBar", {
        id: "__alloyId101",
        __parentSymbol: $.__views.complaint_window
    });
    $.__views.__alloyId101.setParent($.__views.complaint_window);
    var __alloyId102 = function() {
        $["complaint"].__transform = _.isFunction($["complaint"].transform) ? $["complaint"].transform() : $["complaint"].toJSON();
        $.__alloyId88.text = $["complaint"]["__transform"]["title"];
        $.__alloyId91.text = $["complaint"]["__transform"]["is_complaint_label"];
        $.__alloyId94.text = $["complaint"]["__transform"]["date"];
        $.__alloyId97.text = $["complaint"]["__transform"]["status"];
        $.__alloyId100.text = $["complaint"]["__transform"]["description"];
    };
    $["complaint"].on("fetch change destroy", __alloyId102);
    exports.destroy = function() {
        $["complaint"] && $["complaint"].off("fetch change destroy", __alloyId102);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.complaint.set(args.data.attributes);
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "black",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        message: L("complaints_add_picture_loading"),
        style: Ti.UI.ActivityIndicatorStyle.DARK
    });
    $.complaint_window.add(activityIndicator);
    var first_picture = true;
    _.each(args.data.attributes["pictures"], function(picture_id) {
        addPicture(picture_id, first_picture);
        first_picture = false;
    });
    $.complaint_details_table.addEventListener("click", function(row) {});
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;