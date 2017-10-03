var validator = {
    rules: {},
    fields: [],
    validate_lib: null,
    init: function(fields) {
        this.setFields(fields);
        this.setRulesUsingFields();
        this.addEvents();
        this.initializeLib();
        return this;
    },
    validate: function(fields, callback) {
        var self = this;
        var fields_array = [];
        _.each(fields, function(field) {
            fields_array.push(_.extend(self.rules[field.id], {
                value: field.value
            }));
        });
        this.validate_lib.run(fields_array, callback);
    },
    validateForm: function(success_callback) {
        this.validate(this.fields, function(errors) {
            if (errors.length > 0) {
                error_string = "";
                _.each(errors, function(error) {
                    error_string += error.message + "\n";
                });
                Ti.UI.createAlertDialog({
                    buttonNames: [ "Ok" ],
                    message: error_string,
                    title: "Fout, kan niet opslaan"
                }).show();
            } else success_callback();
        });
    },
    addEvents: function() {
        var self = this;
        _.each(this.fields, function(field) {
            field.addEventListener("change", function() {
                self.validate([ field ], function(errors) {
                    field.borderColor = errors.length > 0 ? "red" : "transparent";
                });
            });
        });
    },
    initializeLib: function() {
        var validate = require("hdjs.validate");
        this.validate_lib = new validate.FormValidator();
    },
    setFields: function(fields) {
        this.fields = fields;
    },
    setRulesUsingFields: function() {
        var rules = {};
        _.each(this.fields, function(field) {
            rules[field.id] = {
                id: field.id,
                display: field.hintText,
                rules: field.rules
            };
        });
        this.rules = rules;
    },
    getRules: function(rules) {
        return this.rules;
    },
    getRule: function(field) {
        return this.getRules()[field];
    }
};

module.exports = function(rules) {
    return validator.init(rules);
};