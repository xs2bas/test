var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            name: "text",
            value: "text",
            modified: "text"
        },
        URL: function() {
            Alloy.Globals.addToInitializedCollections(this);
            return Alloy.Globals.getCollectionUrl(this);
        },
        debug: 1,
        useStrictValidation: 1,
        initFetchWithLocalData: 0,
        adapter: {
            type: "sqlrest",
            collection_name: "settings",
            idAttribute: "id",
            addModifedToUrl: true,
            lastModifiedColumn: "modified"
        },
        headers: Alloy.Globals.getAuthenticationHeaders(),
        deleteAllOnFetch: true,
        returnErrorResponse: true
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
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

model = Alloy.M("settings", exports.definition, []);

collection = Alloy.C("settings", exports.definition, model);

exports.Model = model;

exports.Collection = collection;