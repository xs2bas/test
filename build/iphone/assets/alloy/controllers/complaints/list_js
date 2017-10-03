function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId121(e) {
        if (e && e.fromAdapter) return;
        __alloyId121.opts || {};
        var models = __alloyId120.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId109 = models[i];
            __alloyId109.__transform = _.isFunction(__alloyId109.transform) ? __alloyId109.transform() : __alloyId109.toJSON();
            var __alloyId119 = Ti.UI.createTableViewSection({});
            rows.push(__alloyId119);
            var __alloyId112 = Ti.UI.createTableViewRow({
                height: 40,
                model: __alloyId109.__transform.id
            });
            __alloyId119.add(__alloyId112);
            var __alloyId114 = Ti.UI.createLabel({
                left: "5%",
                font: {
                    fontSize: "11dp"
                },
                text: __alloyId109.__transform.status
            });
            __alloyId112.add(__alloyId114);
            var __alloyId116 = Ti.UI.createLabel({
                left: "25%",
                width: "45%",
                ellipsize: true,
                font: {
                    fontSize: "12dp"
                },
                text: __alloyId109.__transform.title
            });
            __alloyId112.add(__alloyId116);
            var __alloyId118 = Ti.UI.createLabel({
                left: "80%",
                font: {
                    fontSize: "11dp"
                },
                text: __alloyId109.__transform.date
            });
            __alloyId112.add(__alloyId118);
        }
        $.__views.complaintList.setData(rows);
    }
    function tableLoader(e) {
        loaderFunction(e, $.complaintCollection);
    }
    function loaderFunction(e, collection) {
        var ln = collection.models.length;
        collection.fetch({
            urlparams: {
                limit: 20,
                offset: ln
            },
            add: true,
            silent: true,
            returnExactServerResponse: true,
            success: function(col) {
                col.models.length === ln ? e.done() : e.success();
            },
            error: e.error
        });
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "complaints/list";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.complaintCollection = Alloy.createCollection("complaint");
    $.__views.main = Ti.UI.createView({
        top: 0,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.__alloyId103 = Ti.UI.createView({
        backgroundColor: "#e7e7e7",
        height: 40,
        top: 0,
        id: "__alloyId103"
    });
    $.__views.main.add($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createLabel({
        left: "5%",
        font: {
            fontSize: "11dp"
        },
        text: L("complaints_list_status"),
        id: "__alloyId104"
    });
    $.__views.__alloyId103.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createLabel({
        left: "25%",
        width: "45%",
        ellipsize: true,
        font: {
            fontSize: "12dp"
        },
        text: L("complaints_list_title"),
        id: "__alloyId105"
    });
    $.__views.__alloyId103.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createLabel({
        left: "80%",
        font: {
            fontSize: "11dp"
        },
        text: L("complaints_list_date"),
        id: "__alloyId106"
    });
    $.__views.__alloyId103.add($.__views.__alloyId106);
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    tableLoader ? $.__views.is.on("end", tableLoader) : __defers["$.__views.is!end!tableLoader"] = true;
    $.__views.complaintList = Ti.UI.createTableView({
        top: 40,
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "complaintList"
    });
    $.__views.main.add($.__views.complaintList);
    var __alloyId120 = Alloy.Collections["$.complaintCollection"] || $.complaintCollection;
    __alloyId120.on("fetch destroy change add remove reset", __alloyId121);
    $.__views.__alloyId122 = Alloy.createController("buttonBar", {
        id: "__alloyId122",
        __parentSymbol: $.__views.main
    });
    $.__views.__alloyId122.setParent($.__views.main);
    exports.destroy = function() {
        __alloyId120 && __alloyId120.off("fetch destroy change add remove reset", __alloyId121);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    $.is.init($.complaintList);
    $.is.load();
    var complaintAdd = Titanium.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.ADD
    });
    Alloy.Globals.current_window.setRightNavButton(complaintAdd);
    $.complaintList.addEventListener("click", function(complaint) {
        var detailController = Alloy.createController("complaints/details", {
            data: $.complaintCollection.get(complaint.rowData.model)
        });
        Alloy.Globals.current_nav_window.openWindow(detailController.getView());
    });
    complaintAdd.addEventListener("click", function(complaint) {
        var addController = Alloy.createController("complaints/add");
        addController.getView().addEventListener("close", function() {
            $.complaintCollection.reset();
            $.is.load();
        });
        Alloy.Globals.current_nav_window.openWindow(addController.getView());
    });
    __defers["$.__views.is!end!tableLoader"] && $.__views.is.on("end", tableLoader);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;