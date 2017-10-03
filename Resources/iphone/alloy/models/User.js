var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            modified: "text",
            username: "text",
            password: "text",
            gender: "text",
            initials: "text",
            firstname: "text",
            middlename: "text",
            name: "text",
            bdate: "text",
            identification: "text",
            phone_home: "text",
            phone_cell: "text",
            email: "text",
            object_address_address: "text",
            object_address_number: "text",
            object_address_zipcode: "text",
            object_address_city: "text",
            date: "text",
            user_address_address: "text",
            user_address_number: "text",
            user_address_zipcode: "text",
            user_address_city: "text",
            bill: "text",
            iban: "text",
            bic: "text",
            payment_type: "text",
            project_emergency_phone: "text",
            corporation_logo: "text",
            corporation_email: "text"
        },
        URL: function() {
            Alloy.Globals.addToInitializedCollections(this);
            return Alloy.Globals.getCollectionUrl(this);
        },
        debug: 1,
        useStrictValidation: 1,
        adapter: {
            type: "sqlrest",
            collection_name: "user",
            idAttribute: "id",
            addModifedToUrl: true,
            lastModifiedColumn: "modified"
        },
        headers: Alloy.Globals.getAuthenticationHeaders(),
        deleteAllOnFetch: true
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

model = Alloy.M("user", exports.definition, [ function(migration) {
    migration.name = "user";
    migration.id = "20160802000000";
    migration.up = function(migrator) {
        migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN corporation_email TEXT;");
    };
    migration.down = function(migrator) {};
} ]);

collection = Alloy.C("user", exports.definition, model);

exports.Model = model;

exports.Collection = collection;