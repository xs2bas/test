function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openCamera() {
        Titanium.Media.showCamera({
            saveToPhotoGallery: false,
            allowEditing: false,
            autohide: false,
            success: function(event) {
                Ti.Media.hideCamera();
                Alloy.Globals.httpRequestAuthenticated("complaint/upload-picture/rest/1/", {
                    postData: {
                        image: event.media,
                        complaint: args.id
                    },
                    onSuccess: function(result) {
                        if (result) {
                            pictures.push(result);
                            addPicture(result);
                        } else alert(L("Opslaan van afbeelding mislukt, probeer het later nogmaals."));
                    }.bind(this),
                    onError: function() {
                        alert(L("Opslaan van afbeelding mislukt, probeer het later nogmaals."));
                    }
                });
            }
        });
    }
    function addPicture(picture_id) {
        var picture_section_index = 1;
        var pictures_section = $.pictures_section;
        var table = $.complaint_add_table;
        var row = Titanium.UI.createTableViewRow({
            name: picture_id
        });
        first_picture && row.add(Titanium.UI.createLabel({
            left: 20,
            width: "33%",
            font: {
                fontSize: "14dp"
            },
            text: "Foto's"
        }));
        var imageview = Titanium.UI.createImageView({
            image: Alloy.Globals.getBackofficeUrl() + "complaint/get-picture/id/" + picture_id + "/rest/1/",
            height: 100,
            left: "33%",
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10
        });
        row.add(imageview);
        imageview.addEventListener("click", function() {
            var imageController = Alloy.createController("complaints/showImage", {
                picture_id: picture_id
            });
            Alloy.Globals.current_nav_window.openWindow(imageController.getView());
        });
        var delete_button = Titanium.UI.createButton({
            right: 20,
            color: "#ff0000",
            title: L("complaints_add_delete")
        });
        delete_button.addEventListener("click", function() {
            Alloy.Globals.confirm(L("complaints_add_delete"), L("complaints_add_delete_message"), function() {
                Alloy.Globals.httpRequestAuthenticated("complaint/delete-picture/rest/1/", {
                    postData: {
                        hash: picture_id
                    },
                    onSuccess: function(result) {
                        pictures_section.remove(row);
                        table.setData(table.data);
                    }.bind(this)
                });
            });
        });
        row.add(delete_button);
        Alloy.Globals.appendRowToSection(table, row, picture_section_index);
        first_picture = false;
    }
    function addItem() {
        validator.validateForm(function() {
            $.button_section_add.hide();
            $.button_section_cancel.hide();
            var complaint = Alloy.Collections.instance("complaint");
            var complaint_item = Alloy.createModel("complaint", {
                status: "Open",
                is_complaint: Alloy.Globals.getTabbedBarValue($.is_complaint),
                title: $.title.value,
                description: $.description.value,
                pictures: JSON.stringify(pictures),
                access_allowed: $.access_allowed.value
            });
            complaint.add(complaint_item);
            complaint_item.save();
            complaint.fetch({
                success: function() {
                    Ti.UI.createAlertDialog({
                        buttonNames: [ "Ok" ],
                        message: L("complaints_add_confirm_save"),
                        title: L("complaints_add_confirm_save_title")
                    }).show();
                    closeWindow();
                }
            });
        });
    }
    function focusTextField() {
        $.title.focus();
    }
    function closeKeyboard(e) {
        e.source.blur();
    }
    function closeWindow() {
        $.complaintAddWin.close();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "complaints/add";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.complaint = Alloy.createModel("complaint");
    $.__views.complaintAddWin = Ti.UI.createWindow({
        backgroundColor: "white",
        includeOpaqueBars: true,
        translucent: false,
        navTintColor: "white",
        barColor: Alloy.Globals.config.styling.baseColor,
        extendEdges: [ Ti.UI.EXTEND_NONE ],
        titleAttributes: {
            color: "white"
        },
        id: "complaintAddWin",
        title: L("complaints_add_title"),
        modal: true
    });
    $.__views.complaintAddWin && $.addTopLevelView($.__views.complaintAddWin);
    focusTextField ? $.addListener($.__views.complaintAddWin, "open", focusTextField) : __defers["$.__views.complaintAddWin!open!focusTextField"] = true;
    $.__views.__alloyId63 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.CAMERA,
        id: "__alloyId63"
    });
    openCamera ? $.addListener($.__views.__alloyId63, "click", openCamera) : __defers["$.__views.__alloyId63!click!openCamera"] = true;
    $.__views.complaintAddWin.rightNavButton = $.__views.__alloyId63;
    var __alloyId64 = [];
    $.__views.__alloyId65 = Ti.UI.createTableViewSection({
        id: "__alloyId65"
    });
    __alloyId64.push($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId66"
    });
    $.__views.__alloyId65.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("complaints_add_is_complaint"),
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createView({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId68"
    });
    $.__views.__alloyId66.add($.__views.__alloyId68);
    var __alloyId70 = [];
    var __alloyId73 = {
        title: L("complaints_add_is_complaint_no_complaint"),
        value: 0
    };
    __alloyId70.push(__alloyId73);
    var __alloyId74 = {
        title: L("complaints_add_is_complaint_complaint"),
        value: 1
    };
    __alloyId70.push(__alloyId74);
    $.__views.is_complaint = Ti.UI.iOS.createTabbedBar({
        backgroundColor: Alloy.Globals.config.styling.baseColor,
        labels: __alloyId70,
        id: "is_complaint",
        left: 5,
        value: 0
    });
    $.__views.__alloyId68.add($.__views.is_complaint);
    $.__views.__alloyId75 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId75"
    });
    $.__views.__alloyId65.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("complaints_add_title"),
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.title = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "title",
        hintText: L("complaints_add_title"),
        rules: "required|min_length[2]"
    });
    $.__views.__alloyId75.add($.__views.title);
    closeKeyboard ? $.addListener($.__views.title, "return", closeKeyboard) : __defers["$.__views.title!return!closeKeyboard"] = true;
    $.__views.__alloyId77 = Ti.UI.createTableViewRow({
        height: 160,
        id: "__alloyId77"
    });
    $.__views.__alloyId65.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        top: 10,
        text: L("complaints_add_description"),
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.description = Ti.UI.createTextArea({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        font: {
            fontSize: "16dp"
        },
        id: "description",
        suppressReturn: false,
        height: "100%",
        top: 3
    });
    $.__views.__alloyId77.add($.__views.description);
    $.__views.__alloyId79 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId79"
    });
    $.__views.__alloyId65.add($.__views.__alloyId79);
    $.__views.access_allowed_label = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        id: "access_allowed_label",
        text: L("complaints_add_access_allowed")
    });
    $.__views.__alloyId79.add($.__views.access_allowed_label);
    $.__views.access_allowed = Ti.UI.createSwitch({
        value: false,
        onTintColor: "#8EC540",
        left: "33%",
        id: "access_allowed"
    });
    $.__views.__alloyId79.add($.__views.access_allowed);
    $.__views.pictures_section = Ti.UI.createTableViewSection({
        id: "pictures_section"
    });
    __alloyId64.push($.__views.pictures_section);
    $.__views.__alloyId80 = Ti.UI.createTableViewSection({
        id: "__alloyId80"
    });
    __alloyId64.push($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    $.__views.button_section_add = Ti.UI.createButton({
        id: "button_section_add",
        title: L("complaints_add_submit")
    });
    $.__views.__alloyId81.add($.__views.button_section_add);
    addItem ? $.addListener($.__views.button_section_add, "click", addItem) : __defers["$.__views.button_section_add!click!addItem"] = true;
    $.__views.__alloyId82 = Ti.UI.createTableViewRow({
        height: 40,
        id: "__alloyId82"
    });
    $.__views.__alloyId80.add($.__views.__alloyId82);
    $.__views.button_section_cancel = Ti.UI.createButton({
        id: "button_section_cancel",
        color: "red",
        title: L("complaints_add_cancel")
    });
    $.__views.__alloyId82.add($.__views.button_section_cancel);
    closeWindow ? $.addListener($.__views.button_section_cancel, "click", closeWindow) : __defers["$.__views.button_section_cancel!click!closeWindow"] = true;
    $.__views.complaint_add_table = Ti.UI.createTableView({
        data: __alloyId64,
        id: "complaint_add_table"
    });
    $.__views.complaintAddWin.add($.__views.complaint_add_table);
    $.__views.__alloyId83 = Alloy.createController("buttonBar", {
        id: "__alloyId83",
        __parentSymbol: $.__views.complaintAddWin
    });
    $.__views.__alloyId83.setParent($.__views.complaintAddWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var validation_fields = [ $.title ];
    var validation = require("validation");
    var validator = new validation(validation_fields);
    var pictures = [];
    Alloy.Globals.setTabbedBarValue($.is_complaint);
    $.is_complaint.addEventListener("click", function() {
        if ("1" == Alloy.Globals.getTabbedBarValue($.is_complaint)) {
            $.access_allowed.hide();
            $.access_allowed_label.hide();
        } else {
            $.access_allowed.show();
            $.access_allowed_label.show();
        }
    });
    var first_picture = true;
    __defers["$.__views.complaintAddWin!open!focusTextField"] && $.addListener($.__views.complaintAddWin, "open", focusTextField);
    __defers["$.__views.__alloyId63!click!openCamera"] && $.addListener($.__views.__alloyId63, "click", openCamera);
    __defers["$.__views.title!return!closeKeyboard"] && $.addListener($.__views.title, "return", closeKeyboard);
    __defers["$.__views.button_section_add!click!addItem"] && $.addListener($.__views.button_section_add, "click", addItem);
    __defers["$.__views.button_section_cancel!click!closeWindow"] && $.addListener($.__views.button_section_cancel, "click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;