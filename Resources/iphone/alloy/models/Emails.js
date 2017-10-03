var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            subject: "text",
            message: "text",
            date: "text",
            stamp: "integer",
            direction: "text",
            attachments: "text"
        },
        URL: function() {
            Alloy.Globals.addToInitializedCollections(this);
            return Alloy.Globals.getCollectionUrl(this);
        },
        debug: 1,
        useStrictValidation: 1,
        adapter: {
            type: "sqlrest",
            collection_name: "email",
            idAttribute: "id",
            addModifedToUrl: true,
            lastModifiedColumn: "modified"
        },
        headers: Alloy.Globals.getAuthenticationHeaders(),
        deleteAllOnFetch: true
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            initialize: function() {
                this.set({
                    direction_image: "images/icons/email-" + this.get("direction") + ".png",
                    attachments: this.get("attachments") ? JSON.parse(this.get("attachments")) : []
                });
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            comparator: function(email) {
                return 0 - email.get("stamp");
            },
            fetch: function(options) {
                return Alloy.Globals.addFetchErrorHandler(this, options);
            }
        });
        return Collection;
    }
};

model = Alloy.M("emails", exports.definition, []);

collection = Alloy.C("emails", exports.definition, model);

exports.Model = model;

exports.Collection = collection;