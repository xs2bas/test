function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId139(e) {
        if (e && e.fromAdapter) return;
        __alloyId139.opts || {};
        var models = __alloyId138.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId129 = models[i];
            __alloyId129.__transform = _.isFunction(__alloyId129.transform) ? __alloyId129.transform() : __alloyId129.toJSON();
            var __alloyId137 = Ti.UI.createTableViewSection({});
            rows.push(__alloyId137);
            var __alloyId132 = Ti.UI.createTableViewRow({
                height: 40,
                model: __alloyId129.__transform.id
            });
            __alloyId137.add(__alloyId132);
            var __alloyId134 = Ti.UI.createLabel({
                left: "5%",
                width: "55%",
                ellipsize: true,
                font: {
                    fontSize: "12dp"
                },
                text: __alloyId129.__transform.title
            });
            __alloyId132.add(__alloyId134);
            var __alloyId136 = Ti.UI.createLabel({
                left: "70%",
                font: {
                    fontSize: "11dp"
                },
                text: __alloyId129.__transform.date
            });
            __alloyId132.add(__alloyId136);
        }
        $.__views.documentList.setData(rows);
    }
    function tableLoader(e) {
        loaderFunction(e, $.documentsCollection);
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
    this.__controllerPath = "documents/list";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.documentsCollection = Alloy.createCollection("documents");
    $.__views.main = Ti.UI.createView({
        top: 0,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.__alloyId124 = Ti.UI.createView({
        backgroundColor: "#e7e7e7",
        height: 40,
        top: 0,
        id: "__alloyId124"
    });
    $.__views.main.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createLabel({
        left: "5%",
        width: "55%",
        ellipsize: true,
        font: {
            fontSize: "12dp"
        },
        text: L("documents_list_title"),
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createLabel({
        left: "70%",
        font: {
            fontSize: "11dp"
        },
        text: L("documents_list_date"),
        id: "__alloyId126"
    });
    $.__views.__alloyId124.add($.__views.__alloyId126);
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    tableLoader ? $.__views.is.on("end", tableLoader) : __defers["$.__views.is!end!tableLoader"] = true;
    $.__views.documentList = Ti.UI.createTableView({
        top: 40,
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "documentList"
    });
    $.__views.main.add($.__views.documentList);
    var __alloyId138 = Alloy.Collections["$.documentsCollection"] || $.documentsCollection;
    __alloyId138.on("fetch destroy change add remove reset", __alloyId139);
    $.__views.__alloyId140 = Alloy.createController("buttonBar", {
        id: "__alloyId140",
        __parentSymbol: $.__views.main
    });
    $.__views.__alloyId140.setParent($.__views.main);
    exports.destroy = function() {
        __alloyId138 && __alloyId138.off("fetch destroy change add remove reset", __alloyId139);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    $.is.init($.documentList);
    $.is.load();
    $.documentList.addEventListener("click", function(document) {
        var detailController = Alloy.createController("documents/details", {
            data: $.documentsCollection.get(document.rowData.model)
        });
        Alloy.Globals.current_nav_window.openWindow(detailController.getView());
    });
    __defers["$.__views.is!end!tableLoader"] && $.__views.is.on("end", tableLoader);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;