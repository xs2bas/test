var defaults = {
    messages: {
        required: L("form_validate_required"),
        matches: L("form_validate_required"),
        valid_email: L("form_validate_valid_email"),
        valid_emails: L("form_validate_valid_emails"),
        min_length: L("form_validate_min_length"),
        max_length: L("form_validate_max_length"),
        exact_length: L("form_validate_exact_length"),
        greater_than: L("form_validate_greater_than"),
        less_than: L("form_validate_less_than"),
        alpha: L("form_validate_alpha"),
        alpha_numeric: L("form_validate_alpha_numeric"),
        alpha_dash: L("form_validate_alpha_dash"),
        numeric: L("form_validate_numeric"),
        integer: L("form_validate_integer"),
        decimal: L("form_validate_decimal"),
        is_natural: L("form_validate_is_natural"),
        is_natural_no_zero: L("form_validate_is_natural_no_zero"),
        valid_ip: L("form_validate_valid_ip"),
        valid_base64: L("form_validate_valid_base64"),
        valid_credit_card: L("form_validate_valid_credit_card"),
        valid_url: L("form_validate_valid_url")
    },
    callback: function(errors) {}
};

var ruleRegex = /^(.+?)\[(.+)\]$/, numericRegex = /^[0-9]+$/, integerRegex = /^\-?[0-9]+$/, decimalRegex = /^\-?[0-9]*\.?[0-9]+$/, emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, alphaRegex = /^[a-z]+$/i, alphaNumericRegex = /^[a-z0-9]+$/i, alphaDashRegex = /^[a-z0-9_\-]+$/i, naturalRegex = /^[0-9]+$/i, naturalNoZeroRegex = /^[1-9][0-9]*$/i, ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i, base64Regex = /[^a-zA-Z0-9\/\+=]/i, numericDashRegex = /^[\d\-\s]+$/, urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

var FormValidator = function() {
    this.errors = [];
    this.messages = {};
    this.handlers = {};
};

FormValidator.prototype.setMessage = function(rule, message) {
    this.messages[rule] = message;
    return this;
};

FormValidator.prototype.registerCallback = function(name, handler) {
    name && "string" == typeof name && handler && "function" == typeof handler && (this.handlers[name] = handler);
    return this;
};

FormValidator.prototype.run = function(fields, callback) {
    callback = callback || defaults.callback;
    this.errors = [];
    this.messages = {};
    for (var i = 0, fieldsLength = fields.length; fieldsLength > i; i++) this._validateField(fields[i]);
    "function" == typeof callback && callback(this.errors);
    return true;
};

FormValidator.prototype._validateField = function(field) {
    var rules = field.rules.split("|"), indexOfRequired = field.rules.indexOf("required"), isEmpty = !field.value || "" === field.value || void 0 === field.value;
    for (var i = 0, ruleLength = rules.length; ruleLength > i; i++) {
        var method = rules[i], param = null, failed = false, parts = ruleRegex.exec(method);
        if (-1 === indexOfRequired && -1 === method.indexOf("!callback_") && isEmpty) continue;
        if (parts) {
            method = parts[1];
            param = parts[2];
        }
        "!" === method.charAt(0) && (method = method.substring(1, method.length));
        if ("function" == typeof this._hooks[method]) this._hooks[method].apply(this, [ field, param ]) || (failed = true); else if ("callback_" === method.substring(0, 9)) {
            method = method.substring(9, method.length);
            "function" == typeof this.handlers[method] && false === this.handlers[method].apply(this, [ field.value, param ]) && (failed = true);
        }
        if (failed) {
            var source = this.messages[method] || defaults.messages[method], message = "An error has occurred with the " + field.display + " field.";
            if (source) {
                message = source.replace("%s", field.display);
                param && (message = message.replace("%s", param));
            }
            this.errors.push({
                name: field.display,
                message: message,
                rule: method
            });
            break;
        }
    }
};

FormValidator.prototype._hooks = {
    required: function(field) {
        var value = field.value;
        return null !== value && "" !== value;
    },
    matches: function(field, value) {
        return field.value.toString() === value.toString();
    },
    valid_email: function(field) {
        return emailRegex.test(field.value);
    },
    valid_emails: function(field) {
        var result = field.value.split(",");
        for (var i = 0; i < result.length; i++) if (!emailRegex.test(result[i])) return false;
        return true;
    },
    min_length: function(field, length) {
        if (!numericRegex.test(length)) return false;
        return field.value.length >= parseInt(length, 10);
    },
    max_length: function(field, length) {
        if (!numericRegex.test(length)) return false;
        return field.value.length <= parseInt(length, 10);
    },
    exact_length: function(field, length) {
        if (!numericRegex.test(length)) return false;
        return field.value.length === parseInt(length, 10);
    },
    greater_than: function(field, param) {
        if (!decimalRegex.test(field.value)) return false;
        return parseFloat(field.value) > parseFloat(param);
    },
    less_than: function(field, param) {
        if (!decimalRegex.test(field.value)) return false;
        return parseFloat(field.value) < parseFloat(param);
    },
    alpha: function(field) {
        return alphaRegex.test(field.value);
    },
    alpha_numeric: function(field) {
        return alphaNumericRegex.test(field.value);
    },
    alpha_dash: function(field) {
        return alphaDashRegex.test(field.value);
    },
    numeric: function(field) {
        return numericRegex.test(field.value);
    },
    integer: function(field) {
        return integerRegex.test(field.value);
    },
    decimal: function(field) {
        return decimalRegex.test(field.value);
    },
    is_natural: function(field) {
        return naturalRegex.test(field.value);
    },
    is_natural_no_zero: function(field) {
        return naturalNoZeroRegex.test(field.value);
    },
    valid_ip: function(field) {
        return ipRegex.test(field.value);
    },
    valid_base64: function(field) {
        return base64Regex.test(field.value);
    },
    valid_url: function(field) {
        return urlRegex.test(field.value);
    },
    valid_credit_card: function(field) {
        if (!numericDashRegex.test(field.value)) return false;
        var nCheck = 0, nDigit = 0, bEven = false;
        var strippedField = field.value.replace(/\D/g, "");
        for (var n = strippedField.length - 1; n >= 0; n--) {
            var cDigit = strippedField.charAt(n);
            nDigit = parseInt(cDigit, 10);
            bEven && (nDigit *= 2) > 9 && (nDigit -= 9);
            nCheck += nDigit;
            bEven = !bEven;
        }
        return nCheck % 10 === 0;
    }
};

exports.FormValidator = FormValidator;