var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            identifier: "text",
            translated_period: "text",
            translated_period_en: "text",
            period: "text",
            start: "INTEGER",
            periodvalue: "integer",
            amount: "integer",
            payed: "integer",
            closed: "integer",
            modified: "text",
            date: "integer",
            payment: "text",
            type: "text",
            hash: "text",
            id_transaction: "integer"
        },
        URL: function() {
            Alloy.Globals.addToInitializedCollections(this);
            return Alloy.Globals.getCollectionUrl(this);
        },
        debug: 1,
        useStrictValidation: 1,
        adapter: {
            type: "sqlrest",
            collection_name: "invoice",
            idAttribute: "id",
            addModifedToUrl: true,
            lastModifiedColumn: "modified"
        },
        headers: Alloy.Globals.getAuthenticationHeaders(),
        deleteAllOnFetch: true
    },
    extendModel: function(Model) {
        var self = this;
        _.extend(Model.prototype, {
            initialize: function() {
                this.set({
                    amount: Alloy.Globals.moneyFormat(this.get("amount") / 100),
                    payed: self.getPayedString(this),
                    translated_period: this.get("translated_period" + ("en" == Titanium.Locale.getCurrentLanguage() ? "_en" : ""))
                });
            }
        });
        return Model;
    },
    getPayedString: function(invoice) {
        var payed_string = "-";
        var timestamp = Date.now() / 1e3 | 0;
        if ("d" == invoice.get("type")) payed_string = "Ja"; else if ("ideal" == invoice.get("payment") || invoice.get("date") < timestamp) if ("energy" != Alloy.Globals.getSetting("software_type") || invoice.get("payed")) {
            var percentage = invoice.get("amount") > 0 ? Math.round(invoice.get("payed") / invoice.get("amount") * 100) : 0;
            payed_string = 100 == percentage ? "Ja" : percentage + "%";
        } else payed_string = "Nee"; else if ("collection" == invoice.get("payment") || invoice.get("date") >= timestamp) payed_string = "Incasso"; else {
            var percentage = invoice.get("amount") > 0 ? Math.round(invoice.get("payed") / invoice.get("amount") * 100) : 0;
            payed_string = 100 == percentage ? "Ja" : percentage + "%";
        }
        return payed_string;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            comparator: function(invoice) {
                return 0 - invoice.get("start");
            },
            fetch: function(options) {
                return Alloy.Globals.addFetchErrorHandler(this, options);
            }
        });
        return Collection;
    }
};

model = Alloy.M("invoice", exports.definition, []);

collection = Alloy.C("invoice", exports.definition, model);

exports.Model = model;

exports.Collection = collection;