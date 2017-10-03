var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            title: "text",
            date: "text",
            version_id: "integer"
        },
        URL: function() {
            Alloy.Globals.addToInitializedCollections(this);
            return Alloy.Globals.getCollectionUrl(this);
        },
        debug: 1,
        useStrictValidation: 1,
        adapter: {
            type: "sqlrest",
            collection_name: "document",
            idAttribute: "id",
            addModifedToUrl: true,
            lastModifiedColumn: "modified"
        },
        headers: _.extend(Alloy.Globals.getAuthenticationHeaders(), {
            language: Titanium.Locale.getCurrentLanguage()
        }),
        deleteAllOnFetch: true
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            initialize: function() {}
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            fetch: function(options) {
                return Alloy.Globals.addFetchErrorHandler(this, options);
            }
        });
        return Collection;
    }
};

model = Alloy.M("documents", exports.definition, []);

collection = Alloy.C("documents", exports.definition, model);

exports.Model = model;

exports.Collection = collection;