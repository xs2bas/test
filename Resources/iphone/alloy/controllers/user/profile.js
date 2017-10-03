function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function saveProfile() {
        validator.validateForm(function() {
            Alloy.Globals.confirm(L("user_profile_group_save"), L("user_profile_save_confirm_text"), function() {
                $.user.save({
                    password: $.password.value.length > 3 ? Titanium.Utils.sha1($.password.value).toUpperCase() : null,
                    initials: $.initials.value,
                    firstname: $.firstname.value,
                    middlename: $.middlename.value,
                    name: $.name.value,
                    bdate: $.bdate.value,
                    phone_home: $.phone_home.value,
                    phone_cell: $.phone_cell.value,
                    email: $.email.value,
                    user_address_address: $.user_address_address.value,
                    user_address_number: $.user_address_number.value,
                    user_address_zipcode: $.user_address_zipcode.value,
                    user_address_city: $.user_address_city.value,
                    iban: $.iban.value,
                    bic: $.bic.value,
                    payment_type: Alloy.Globals.getTabbedBarValue($.payment_type),
                    bill: Alloy.Globals.getTabbedBarValue($.bill)
                });
                Alloy.Globals.showPage("home");
            });
        });
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "user/profile";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.user = Alloy.createModel("user");
    $.__views.main = Ti.UI.createView({
        top: 0,
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    var __alloyId202 = [];
    $.__views.__alloyId203 = Ti.UI.createTableViewSection({
        headerTitle: L("user_profile_group_login"),
        id: "__alloyId203"
    });
    __alloyId202.push($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId204"
    });
    $.__views.__alloyId203.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_username"),
        id: "__alloyId205"
    });
    $.__views.__alloyId204.add($.__views.__alloyId205);
    $.__views.username = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        color: "#737373",
        editable: false,
        id: "username",
        hintText: L("user_profile_username")
    });
    $.__views.__alloyId204.add($.__views.username);
    $.__views.__alloyId206 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId206"
    });
    $.__views.__alloyId203.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_password"),
        id: "__alloyId207"
    });
    $.__views.__alloyId206.add($.__views.__alloyId207);
    $.__views.password = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "password",
        passwordMask: true,
        hintText: L("user_profile_password")
    });
    $.__views.__alloyId206.add($.__views.password);
    $.__views.__alloyId208 = Ti.UI.createTableViewSection({
        headerTitle: L("user_profile_group_general"),
        id: "__alloyId208"
    });
    __alloyId202.push($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId209"
    });
    $.__views.__alloyId208.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_initials"),
        id: "__alloyId210"
    });
    $.__views.__alloyId209.add($.__views.__alloyId210);
    $.__views.initials = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "initials",
        rules: "required|min_length[2]",
        hintText: L("user_profile_initials")
    });
    $.__views.__alloyId209.add($.__views.initials);
    $.__views.__alloyId211 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId211"
    });
    $.__views.__alloyId208.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_firstname"),
        id: "__alloyId212"
    });
    $.__views.__alloyId211.add($.__views.__alloyId212);
    $.__views.firstname = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "firstname",
        hintText: L("user_profile_firstname")
    });
    $.__views.__alloyId211.add($.__views.firstname);
    $.__views.__alloyId213 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId213"
    });
    $.__views.__alloyId208.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_middlename"),
        id: "__alloyId214"
    });
    $.__views.__alloyId213.add($.__views.__alloyId214);
    $.__views.middlename = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "middlename",
        hintText: L("user_profile_middlename")
    });
    $.__views.__alloyId213.add($.__views.middlename);
    $.__views.__alloyId215 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId215"
    });
    $.__views.__alloyId208.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_name"),
        id: "__alloyId216"
    });
    $.__views.__alloyId215.add($.__views.__alloyId216);
    $.__views.name = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "name",
        hintText: L("user_profile_name")
    });
    $.__views.__alloyId215.add($.__views.name);
    $.__views.__alloyId217 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId217"
    });
    $.__views.__alloyId208.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_bdate"),
        id: "__alloyId218"
    });
    $.__views.__alloyId217.add($.__views.__alloyId218);
    $.__views.bdate = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "bdate",
        hintText: L("user_profile_bdate"),
        editable: 0
    });
    $.__views.__alloyId217.add($.__views.bdate);
    $.__views.__alloyId219 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId219"
    });
    $.__views.__alloyId208.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_phone_home"),
        id: "__alloyId220"
    });
    $.__views.__alloyId219.add($.__views.__alloyId220);
    $.__views.phone_home = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "phone_home",
        rules: "numeric",
        hintText: L("user_profile_phone_home")
    });
    $.__views.__alloyId219.add($.__views.phone_home);
    $.__views.__alloyId221 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId221"
    });
    $.__views.__alloyId208.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_phone_cell"),
        id: "__alloyId222"
    });
    $.__views.__alloyId221.add($.__views.__alloyId222);
    $.__views.phone_cell = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "phone_cell",
        rules: "numeric",
        hintText: L("user_profile_phone_cell")
    });
    $.__views.__alloyId221.add($.__views.phone_cell);
    $.__views.__alloyId223 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId223"
    });
    $.__views.__alloyId208.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_email"),
        id: "__alloyId224"
    });
    $.__views.__alloyId223.add($.__views.__alloyId224);
    $.__views.email = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "email",
        rules: "valid_email",
        hintText: L("user_profile_email")
    });
    $.__views.__alloyId223.add($.__views.email);
    $.__views.__alloyId225 = Ti.UI.createTableViewSection({
        headerTitle: L("user_profile_group_object_address"),
        id: "__alloyId225"
    });
    __alloyId202.push($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId226"
    });
    $.__views.__alloyId225.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_address_address"),
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        color: "#737373",
        editable: false,
        hintText: L("user_profile_address_address"),
        id: "__alloyId228"
    });
    $.__views.__alloyId226.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId229"
    });
    $.__views.__alloyId225.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_address_number"),
        id: "__alloyId230"
    });
    $.__views.__alloyId229.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        color: "#737373",
        editable: false,
        hintText: L("user_profile_address_number"),
        id: "__alloyId231"
    });
    $.__views.__alloyId229.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId232"
    });
    $.__views.__alloyId225.add($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_address_zipcode"),
        id: "__alloyId233"
    });
    $.__views.__alloyId232.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        color: "#737373",
        editable: false,
        hintText: L("user_profile_address_zipcode"),
        id: "__alloyId234"
    });
    $.__views.__alloyId232.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId235"
    });
    $.__views.__alloyId225.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_address_city"),
        id: "__alloyId236"
    });
    $.__views.__alloyId235.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        color: "#737373",
        editable: false,
        hintText: L("user_profile_address_city"),
        id: "__alloyId237"
    });
    $.__views.__alloyId235.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createTableViewSection({
        headerTitle: L("user_profile_group_period"),
        id: "__alloyId238"
    });
    __alloyId202.push($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId239"
    });
    $.__views.__alloyId238.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_date"),
        id: "__alloyId240"
    });
    $.__views.__alloyId239.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        color: "#737373",
        editable: false,
        value: "01-02-2015",
        hintText: L("user_profile_date"),
        id: "__alloyId241"
    });
    $.__views.__alloyId239.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createTableViewSection({
        headerTitle: L("user_profile_group_user_address"),
        id: "__alloyId242"
    });
    __alloyId202.push($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId243"
    });
    $.__views.__alloyId242.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_address_address"),
        id: "__alloyId244"
    });
    $.__views.__alloyId243.add($.__views.__alloyId244);
    $.__views.user_address_address = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "user_address_address",
        hintText: L("user_profile_address_address")
    });
    $.__views.__alloyId243.add($.__views.user_address_address);
    $.__views.__alloyId245 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId245"
    });
    $.__views.__alloyId242.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_address_number"),
        id: "__alloyId246"
    });
    $.__views.__alloyId245.add($.__views.__alloyId246);
    $.__views.user_address_number = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "user_address_number",
        hintText: L("user_profile_address_number")
    });
    $.__views.__alloyId245.add($.__views.user_address_number);
    $.__views.__alloyId247 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId247"
    });
    $.__views.__alloyId242.add($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_address_zipcode"),
        id: "__alloyId248"
    });
    $.__views.__alloyId247.add($.__views.__alloyId248);
    $.__views.user_address_zipcode = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "user_address_zipcode",
        hintText: L("user_profile_address_zipcode")
    });
    $.__views.__alloyId247.add($.__views.user_address_zipcode);
    $.__views.__alloyId249 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId249"
    });
    $.__views.__alloyId242.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_address_city"),
        id: "__alloyId250"
    });
    $.__views.__alloyId249.add($.__views.__alloyId250);
    $.__views.user_address_city = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "user_address_city",
        hintText: L("user_profile_address_city")
    });
    $.__views.__alloyId249.add($.__views.user_address_city);
    $.__views.__alloyId251 = Ti.UI.createTableViewSection({
        headerTitle: L("user_profile_group_payment"),
        id: "__alloyId251"
    });
    __alloyId202.push($.__views.__alloyId251);
    $.__views.__alloyId252 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId252"
    });
    $.__views.__alloyId251.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_preferences_iban"),
        id: "__alloyId253"
    });
    $.__views.__alloyId252.add($.__views.__alloyId253);
    $.__views.iban = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "iban",
        hintText: L("user_profile_preferences_iban")
    });
    $.__views.__alloyId252.add($.__views.iban);
    $.__views.__alloyId254 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId254"
    });
    $.__views.__alloyId251.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_preferences_bic"),
        id: "__alloyId255"
    });
    $.__views.__alloyId254.add($.__views.__alloyId255);
    $.__views.bic = Ti.UI.createTextField({
        height: 20,
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "bic",
        hintText: L("user_profile_preferences_bic")
    });
    $.__views.__alloyId254.add($.__views.bic);
    $.__views.payment_type_form_row = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "payment_type_form_row"
    });
    $.__views.__alloyId251.add($.__views.payment_type_form_row);
    $.__views.__alloyId256 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_preferences_payment_type"),
        id: "__alloyId256"
    });
    $.__views.payment_type_form_row.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createView({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId257"
    });
    $.__views.payment_type_form_row.add($.__views.__alloyId257);
    var __alloyId259 = [];
    var __alloyId262 = {
        title: L("user_profile_preferences_payment_type_ideal"),
        value: "ideal"
    };
    __alloyId259.push(__alloyId262);
    var __alloyId263 = {
        title: L("user_profile_preferences_payment_type_collection"),
        value: "collection"
    };
    __alloyId259.push(__alloyId263);
    $.__views.payment_type = Ti.UI.iOS.createTabbedBar({
        backgroundColor: Alloy.Globals.config.styling.baseColor,
        labels: __alloyId259,
        id: "payment_type",
        left: 5
    });
    $.__views.__alloyId257.add($.__views.payment_type);
    $.__views.bill_form_row = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "bill_form_row"
    });
    $.__views.__alloyId251.add($.__views.bill_form_row);
    $.__views.__alloyId264 = Ti.UI.createLabel({
        left: 20,
        width: "33%",
        font: {
            fontSize: "14dp"
        },
        text: L("user_profile_preferences_bill"),
        id: "__alloyId264"
    });
    $.__views.bill_form_row.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createView({
        left: "33%",
        width: "66%",
        paddingLeft: 10,
        id: "__alloyId265"
    });
    $.__views.bill_form_row.add($.__views.__alloyId265);
    var __alloyId267 = [];
    var __alloyId270 = {
        title: L("user_profile_preferences_bill_post"),
        value: "post"
    };
    __alloyId267.push(__alloyId270);
    var __alloyId271 = {
        title: L("user_profile_preferences_bill_email"),
        value: "email"
    };
    __alloyId267.push(__alloyId271);
    $.__views.bill = Ti.UI.iOS.createTabbedBar({
        backgroundColor: Alloy.Globals.config.styling.baseColor,
        labels: __alloyId267,
        id: "bill",
        left: 5
    });
    $.__views.__alloyId265.add($.__views.bill);
    $.__views.__alloyId272 = Ti.UI.createTableViewSection({
        headerTitle: L("user_profile_group_save"),
        id: "__alloyId272"
    });
    __alloyId202.push($.__views.__alloyId272);
    $.__views.__alloyId273 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId273"
    });
    $.__views.__alloyId272.add($.__views.__alloyId273);
    $.__views.__alloyId274 = Ti.UI.createButton({
        title: L("user_profile_save_button"),
        id: "__alloyId274"
    });
    $.__views.__alloyId273.add($.__views.__alloyId274);
    saveProfile ? $.addListener($.__views.__alloyId274, "click", saveProfile) : __defers["$.__views.__alloyId274!click!saveProfile"] = true;
    $.__views.__alloyId275 = Ti.UI.createTableViewRow({
        height: 40,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "__alloyId275"
    });
    $.__views.__alloyId272.add($.__views.__alloyId275);
    $.__views.__alloyId276 = Ti.UI.createButton({
        color: "red",
        title: L("user_profile_logout_button"),
        id: "__alloyId276"
    });
    $.__views.__alloyId275.add($.__views.__alloyId276);
    try {
        $.addListener($.__views.__alloyId276, "click", Alloy.Globals.doLogout);
    } catch (e) {
        __defers["$.__views.__alloyId276!click!Alloy.Globals.doLogout"] = true;
    }
    $.__views.tableview = Ti.UI.createTableView({
        data: __alloyId202,
        id: "tableview",
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        bottom: 80
    });
    $.__views.main.add($.__views.tableview);
    $.__views.pickerView = Ti.UI.createView({
        id: "pickerView",
        width: "100%",
        bottom: 80,
        visible: 0,
        height: "100%",
        zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.33)"
    });
    $.__views.main.add($.__views.pickerView);
    $.__views.__alloyId277 = Ti.UI.createView({
        height: 300,
        backgroundColor: "white",
        id: "__alloyId277"
    });
    $.__views.pickerView.add($.__views.__alloyId277);
    $.__views.picker = Ti.UI.createPicker({
        minDate: new Date("Mon Jan 01 1900 00:00:00 GMT+0100 (CET)"),
        format24: false,
        calendarViewShown: false,
        id: "picker",
        width: "100%",
        bottom: 80,
        top: 0,
        type: Ti.UI.PICKER_TYPE_DATE
    });
    $.__views.__alloyId277.add($.__views.picker);
    var __alloyId280 = [];
    $.__views.__alloyId281 = Ti.UI.createButton({
        systemButton: Ti.UI.iOS.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId280.push($.__views.__alloyId281);
    $.__views.pickerSave = Ti.UI.createButton({
        id: "pickerSave",
        title: L("user_profile_save_button"),
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId280.push($.__views.pickerSave);
    $.__views.__alloyId278 = Ti.UI.createToolbar({
        items: __alloyId280,
        bottom: 0,
        height: 80,
        id: "__alloyId278"
    });
    $.__views.__alloyId277.add($.__views.__alloyId278);
    $.__views.__alloyId282 = Alloy.createController("buttonBar", {
        id: "__alloyId282",
        __parentSymbol: $.__views.main
    });
    $.__views.__alloyId282.setParent($.__views.main);
    var __alloyId283 = function() {
        $["user"].__transform = _.isFunction($["user"].transform) ? $["user"].transform() : $["user"].toJSON();
        $.username.value = $["user"]["__transform"]["username"];
        $.initials.value = $["user"]["__transform"]["initials"];
        $.firstname.value = $["user"]["__transform"]["firstname"];
        $.middlename.value = $["user"]["__transform"]["middlename"];
        $.name.value = $["user"]["__transform"]["name"];
        $.bdate.value = $["user"]["__transform"]["bdate"];
        $.phone_home.value = $["user"]["__transform"]["phone_home"];
        $.phone_cell.value = $["user"]["__transform"]["phone_cell"];
        $.email.value = $["user"]["__transform"]["email"];
        $.__alloyId228.value = $["user"]["__transform"]["object_address_address"];
        $.__alloyId231.value = $["user"]["__transform"]["object_address_number"];
        $.__alloyId234.value = $["user"]["__transform"]["object_address_zipcode"];
        $.__alloyId237.value = $["user"]["__transform"]["object_address_city"];
        $.user_address_address.value = $["user"]["__transform"]["user_address_address"];
        $.user_address_number.value = $["user"]["__transform"]["user_address_number"];
        $.user_address_zipcode.value = $["user"]["__transform"]["user_address_zipcode"];
        $.user_address_city.value = $["user"]["__transform"]["user_address_city"];
        $.iban.value = $["user"]["__transform"]["iban"];
        $.bic.value = $["user"]["__transform"]["bic"];
        $.payment_type.value = $["user"]["__transform"]["payment_type"];
        $.bill.value = $["user"]["__transform"]["bill"];
    };
    $["user"].on("fetch change destroy", __alloyId283);
    exports.destroy = function() {
        $["user"] && $["user"].off("fetch change destroy", __alloyId283);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    var validation_fields = [ $.initials, $.phone_home, $.phone_cell, $.email ];
    var validation = require("validation");
    var validator = new validation(validation_fields);
    var saveButton = Titanium.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.SAVE
    });
    Alloy.Globals.current_window.setRightNavButton(saveButton);
    saveButton.addEventListener("click", function(complaint) {
        saveProfile();
    });
    var tabbed_bar_elements = [ "payment_type", "bill" ];
    Alloy.Collections.user;
    $.user.fetch({
        success: function() {
            _.each(tabbed_bar_elements, function(tabbed_bar_element) {
                Alloy.Globals.setTabbedBarValue($[tabbed_bar_element]);
            });
        }
    });
    $.bdate.addEventListener("click", function() {
        $.pickerView.show();
        $.picker.addEventListener("change", function(e) {
            var date = e.value;
            var month = "" + (date.getMonth() + 1);
            1 == month.length && (month = "0" + month);
            var day = "" + date.getDate();
            1 == day.length && (day = "0" + day);
            $.bdate.value = day + "-" + month + "-" + date.getFullYear();
        });
    });
    $.pickerSave.addEventListener("click", function() {
        $.pickerView.hide();
    });
    "ravel" == Alloy.Globals.getSetting("general_company_shortname") ? $.payment_type_form_row.hide() : "1" == Alloy.Globals.getSetting("modules_tenantLogin_hide_collection_type") && $.payment_type_form_row.hide();
    if ("ravel" == Alloy.Globals.getSetting("general_company_shortname")) {
        $.tableview.deleteRow($.payment_type_form_row);
        $.tableview.deleteRow($.bill_form_row);
    }
    __defers["$.__views.__alloyId274!click!saveProfile"] && $.addListener($.__views.__alloyId274, "click", saveProfile);
    __defers["$.__views.__alloyId276!click!Alloy.Globals.doLogout"] && $.addListener($.__views.__alloyId276, "click", Alloy.Globals.doLogout);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;