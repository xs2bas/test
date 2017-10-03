function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId173(e) {
        if (e && e.fromAdapter) return;
        __alloyId173.opts || {};
        var models = __alloyId172.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId159 = models[i];
            __alloyId159.__transform = _.isFunction(__alloyId159.transform) ? __alloyId159.transform() : __alloyId159.toJSON();
            var __alloyId171 = Ti.UI.createTableViewSection({});
            rows.push(__alloyId171);
            var __alloyId162 = Ti.UI.createTableViewRow({
                height: 40,
                model: __alloyId159.__transform.id
            });
            __alloyId171.add(__alloyId162);
            var __alloyId164 = Ti.UI.createLabel({
                left: "5%",
                width: "5%",
                font: {
                    fontSize: "12dp"
                }
            });
            __alloyId162.add(__alloyId164);
            var __alloyId166 = Ti.UI.createImageView({
                image: __alloyId159.__transform.direction_image
            });
            __alloyId164.add(__alloyId166);
            var __alloyId168 = Ti.UI.createLabel({
                left: "15%",
                width: "45%",
                ellipsize: true,
                font: {
                    fontSize: "12dp"
                },
                text: __alloyId159.__transform.subject
            });
            __alloyId162.add(__alloyId168);
            var __alloyId170 = Ti.UI.createLabel({
                left: "70%",
                font: {
                    fontSize: "11dp"
                },
                text: __alloyId159.__transform.date
            });
            __alloyId162.add(__alloyId170);
        }
        $.__views.emailList.setData(rows);
    }
    function tableLoader(e) {
        loaderFunction(e, $.emailsCollection);
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
    this.__controllerPath = "emails/list";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.emailsCollection = Alloy.createCollection("emails");
    $.__views.main = Ti.UI.createView({
        top: 0,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.__alloyId153 = Ti.UI.createView({
        backgroundColor: "#e7e7e7",
        height: 40,
        top: 0,
        id: "__alloyId153"
    });
    $.__views.main.add($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createLabel({
        left: "5%",
        width: "5%",
        font: {
            fontSize: "12dp"
        },
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createLabel({
        left: "15%",
        width: "45%",
        ellipsize: true,
        font: {
            fontSize: "12dp"
        },
        text: L("emails_list_subject"),
        id: "__alloyId155"
    });
    $.__views.__alloyId153.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createLabel({
        left: "70%",
        font: {
            fontSize: "11dp"
        },
        text: L("emails_list_date"),
        id: "__alloyId156"
    });
    $.__views.__alloyId153.add($.__views.__alloyId156);
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    tableLoader ? $.__views.is.on("end", tableLoader) : __defers["$.__views.is!end!tableLoader"] = true;
    $.__views.emailList = Ti.UI.createTableView({
        top: 40,
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "emailList"
    });
    $.__views.main.add($.__views.emailList);
    var __alloyId172 = Alloy.Collections["$.emailsCollection"] || $.emailsCollection;
    __alloyId172.on("fetch destroy change add remove reset", __alloyId173);
    $.__views.__alloyId174 = Alloy.createController("buttonBar", {
        id: "__alloyId174",
        __parentSymbol: $.__views.main
    });
    $.__views.__alloyId174.setParent($.__views.main);
    exports.destroy = function() {
        __alloyId172 && __alloyId172.off("fetch destroy change add remove reset", __alloyId173);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    $.is.init($.emailList);
    $.is.load();
    $.emailList.addEventListener("click", function(email) {
        var detailController = Alloy.createController("emails/details", {
            data: $.emailsCollection.get(email.rowData.model)
        });
        Alloy.Globals.current_nav_window.openWindow(detailController.getView());
    });
    __defers["$.__views.is!end!tableLoader"] && $.__views.is.on("end", tableLoader);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;