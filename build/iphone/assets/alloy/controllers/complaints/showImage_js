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
    this.__controllerPath = "complaints/showImage";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.showImage = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "showImage"
    });
    $.__views.showImage && $.addTopLevelView($.__views.showImage);
    $.__views.__alloyId123 = Ti.UI.createView({
        id: "__alloyId123"
    });
    $.__views.showImage.add($.__views.__alloyId123);
    $.__views.imageview = Ti.UI.createImageView({
        id: "imageview"
    });
    $.__views.__alloyId123.add($.__views.imageview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.imageview.setImage(Alloy.Globals.getBackofficeUrl() + "complaint/get-picture/id/" + args.picture_id + "/rest/1/");
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;