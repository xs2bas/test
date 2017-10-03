function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId196(e) {
        if (e && e.fromAdapter) return;
        __alloyId196.opts || {};
        var models = __alloyId195.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId182 = models[i];
            __alloyId182.__transform = _.isFunction(__alloyId182.transform) ? __alloyId182.transform() : __alloyId182.toJSON();
            var __alloyId194 = Ti.UI.createTableViewSection({});
            rows.push(__alloyId194);
            var __alloyId185 = Ti.UI.createTableViewRow({
                height: 40,
                model: __alloyId182.__transform.id
            });
            __alloyId194.add(__alloyId185);
            var __alloyId187 = Ti.UI.createLabel({
                left: 10,
                font: {
                    fontSize: "12dp"
                },
                text: __alloyId182.__transform.translated_period
            });
            __alloyId185.add(__alloyId187);
            var __alloyId189 = Ti.UI.createLabel({
                left: "35%",
                font: {
                    fontSize: "12dp"
                },
                text: __alloyId182.__transform.identifier
            });
            __alloyId185.add(__alloyId189);
            var __alloyId191 = Ti.UI.createLabel({
                left: "60%",
                textAlign: "right",
                width: "20%",
                font: {
                    fontSize: "12dp"
                },
                text: __alloyId182.__transform.amount
            });
            __alloyId185.add(__alloyId191);
            var __alloyId193 = Ti.UI.createLabel({
                left: "85%",
                font: {
                    fontSize: "12dp"
                },
                text: __alloyId182.__transform.payed
            });
            __alloyId185.add(__alloyId193);
        }
        $.__views.invoiceList.setData(rows);
    }
    function tableLoader(e) {
        loaderFunction(e, $.invoicesCollection);
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
    this.__controllerPath = "invoices/list";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.invoicesCollection = Alloy.createCollection("invoice");
    $.__views.main = Ti.UI.createView({
        top: 0,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.__alloyId175 = Ti.UI.createView({
        backgroundColor: "#e7e7e7",
        height: 40,
        top: 0,
        id: "__alloyId175"
    });
    $.__views.main.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "12dp"
        },
        text: L("invoices_list_period"),
        id: "__alloyId176"
    });
    $.__views.__alloyId175.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createLabel({
        left: "35%",
        font: {
            fontSize: "12dp"
        },
        text: L("invoices_list_identifier"),
        id: "__alloyId177"
    });
    $.__views.__alloyId175.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createLabel({
        left: "60%",
        textAlign: "right",
        width: "20%",
        font: {
            fontSize: "12dp"
        },
        text: L("invoices_list_amount"),
        id: "__alloyId178"
    });
    $.__views.__alloyId175.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createLabel({
        left: "85%",
        font: {
            fontSize: "12dp"
        },
        text: L("invoices_list_payed"),
        id: "__alloyId179"
    });
    $.__views.__alloyId175.add($.__views.__alloyId179);
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    tableLoader ? $.__views.is.on("end", tableLoader) : __defers["$.__views.is!end!tableLoader"] = true;
    $.__views.invoiceList = Ti.UI.createTableView({
        top: 40,
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "invoiceList"
    });
    $.__views.main.add($.__views.invoiceList);
    var __alloyId195 = Alloy.Collections["$.invoicesCollection"] || $.invoicesCollection;
    __alloyId195.on("fetch destroy change add remove reset", __alloyId196);
    $.__views.__alloyId197 = Alloy.createController("buttonBar", {
        id: "__alloyId197",
        __parentSymbol: $.__views.main
    });
    $.__views.__alloyId197.setParent($.__views.main);
    exports.destroy = function() {
        __alloyId195 && __alloyId195.off("fetch destroy change add remove reset", __alloyId196);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    $.is.init($.invoiceList);
    $.is.load();
    $.invoiceList.addEventListener("click", function(invoice) {
        var detailController = Alloy.createController("invoices/details", {
            data: $.invoicesCollection.get(invoice.rowData.model)
        });
        Alloy.Globals.current_nav_window.openWindow(detailController.getView());
    });
    __defers["$.__views.is!end!tableLoader"] && $.__views.is.on("end", tableLoader);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;