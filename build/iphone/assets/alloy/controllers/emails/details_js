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
    this.__controllerPath = "emails/details";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.emails = Alloy.createModel("emails");
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
    var __alloyId142 = [];
    $.__views.__alloyId143 = Ti.UI.createTableViewSection({
        id: "__alloyId143"
    });
    __alloyId142.push($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("emails_list_subject"),
        id: "__alloyId145"
    });
    $.__views.__alloyId144.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId146"
    });
    $.__views.__alloyId144.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId147"
    });
    $.__views.__alloyId143.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("emails_list_date"),
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createLabel({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId149"
    });
    $.__views.__alloyId147.add($.__views.__alloyId149);
    $.__views.__alloyId141 = Ti.UI.createTableView({
        data: __alloyId142,
        height: 100,
        top: 0,
        id: "__alloyId141"
    });
    $.__views.details.add($.__views.__alloyId141);
    $.__views.attachments = Ti.UI.createView({
        left: 0,
        width: "100%",
        paddingLeft: 10,
        top: 90,
        id: "attachments"
    });
    $.__views.details.add($.__views.attachments);
    $.__views.__alloyId150 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        top: 0,
        text: L("emails_details_attachments"),
        id: "__alloyId150"
    });
    $.__views.attachments.add($.__views.__alloyId150);
    $.__views.attachments_list = Ti.UI.createView({
        left: "33%",
        paddingLeft: 10,
        right: 0,
        id: "attachments_list"
    });
    $.__views.attachments.add($.__views.attachments_list);
    $.__views.webview = Ti.UI.createWebView({
        left: 20,
        right: 20,
        bottom: 80,
        id: "webview"
    });
    $.__views.details.add($.__views.webview);
    $.__views.__alloyId151 = Alloy.createController("buttonBar", {
        id: "__alloyId151",
        __parentSymbol: $.__views.details
    });
    $.__views.__alloyId151.setParent($.__views.details);
    var __alloyId152 = function() {
        $["emails"].__transform = _.isFunction($["emails"].transform) ? $["emails"].transform() : $["emails"].toJSON();
        $.__alloyId146.text = $["emails"]["__transform"]["subject"];
        $.__alloyId149.text = $["emails"]["__transform"]["date"];
        $.webview.html = $["emails"]["__transform"]["message"];
    };
    $["emails"].on("fetch change destroy", __alloyId152);
    exports.destroy = function() {
        $["emails"] && $["emails"].off("fetch change destroy", __alloyId152);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.data.attributes["message"] += "<style>*{ font-family: 'HelveticaNeue'; font-size: 14px; }</style>";
    var attachment_row_height = 30;
    if (args.data.attributes["attachments"].length > 0) $.attachments.show(); else {
        $.webview.top -= attachment_row_height;
        $.attachments.hide();
    }
    _.each(args.data.attributes["attachments"], function(attachment, attachment_key) {
        var label = Ti.UI.createLabel({
            text: attachment.name,
            top: 0 == attachment_key ? 0 : attachment_key * attachment_row_height,
            height: attachment_row_height,
            left: 0,
            right: 0
        });
        label.addEventListener("click", function() {
            var win = Titanium.UI.createWindow({
                title: L("emails_details_attachment_title")
            });
            var webview = Titanium.UI.createWebView({});
            Alloy.Globals.httpRequestAuthenticated("email/get-attachment/id/" + attachment.id + "/", {
                returnData: true,
                onSuccess: function(result) {
                    webview.setData(result);
                }
            });
            win.add(webview);
            Alloy.Globals.current_nav_window.openWindow(win);
        });
        $.attachments_list.add(label);
    });
    $.attachments.setHeight(args.data.attributes["attachments"].length * attachment_row_height);
    $.webview.setTop(100 + args.data.attributes["attachments"].length * attachment_row_height);
    $.emails.set(args.data.attributes);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;