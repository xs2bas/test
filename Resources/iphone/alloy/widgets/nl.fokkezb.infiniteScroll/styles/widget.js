function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.infiniteScroll/" + s : s.substring(0, index) + "/nl.fokkezb.infiniteScroll/" + s.substring(index + 1);
    return 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0003,
    key: "Window",
    style: {
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        }
    }
}, {
    isApi: true,
    priority: 1000.0004,
    key: "TabbedBar",
    style: {
        backgroundColor: Alloy.Globals.config.styling.baseColor
    }
}, {
    isApi: true,
    priority: 1000.0005,
    key: "TextField",
    style: {
        height: 20
    }
}, {
    isApi: true,
    priority: 1000.0006,
    key: "TableViewRow",
    style: {
        height: 40
    }
}, {
    isClass: true,
    priority: 10000.0002,
    key: "formRow",
    style: {
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
    }
}, {
    isClass: true,
    priority: 10000.0007,
    key: "autoheight",
    style: {
        height: Ti.UI.SIZE,
        bottom: 10
    }
}, {
    isClass: true,
    priority: 10000.0008,
    key: "formlabel",
    style: {
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        }
    }
}, {
    isClass: true,
    priority: 10000.0009,
    key: "formvalue",
    style: {
        left: "33%",
        width: "66%",
        paddingLeft: 10
    }
}, {
    isClass: true,
    priority: 10000.001,
    key: "disabled",
    style: {
        color: "#737373"
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "listLegend",
    style: {
        backgroundColor: "#e7e7e7",
        height: 40,
        top: 0
    }
}, {
    isClass: true,
    priority: 10000.0012,
    key: "is",
    style: {
        top: "0dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0013,
    key: "isCenter",
    style: {
        height: "50dp",
        bottom: "0dp"
    }
}, {
    isClass: true,
    priority: 10000.0014,
    key: "isIndicator",
    style: {
        style: Ti.UI.ActivityIndicatorStyle.DARK
    }
}, {
    isClass: true,
    priority: 10000.0016,
    key: "isText",
    style: {
        wordWrap: false,
        color: "#777",
        font: {
            fontSize: "13dp"
        }
    }
}, {
    isClass: true,
    priority: 10101.0015,
    key: "isIndicator",
    style: {
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    }
}, {
    isId: true,
    priority: 100000.0001,
    key: "main",
    style: {
        top: 0
    }
} ];