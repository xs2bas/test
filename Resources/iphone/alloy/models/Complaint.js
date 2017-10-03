var Alloy = require("/alloy"), _ = require("/alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            is_complaint: "integer",
            title: "text",
            description: "text",
            date: "text",
            modified: "text",
            status: "text",
            pictures: "text",
            last_status: "integer",
            access_allowed: "integer"
        },
        URL: function() {
            Alloy.Globals.addToInitializedCollections(this);
            return Alloy.Globals.getCollectionUrl(this);
        },
        debug: 1,
        useStrictValidation: 1,
        adapter: {
            type: "sqlrest",
            collection_name: "complaint",
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
                var status = new String(this.get("status"));
                this.set({
                    pictures: this.get("pictures") ? JSON.parse(this.get("pictures")) : [],
                    is_complaint_label: L("complaints_is_complaint_" + (this.get("is_complaint") ? "yes" : "no"), "-"),
                    status: L("complaints_status_" + status.replace(" ", "_"), "-")
                });
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            comparator: function(complaint) {
                var myDate = complaint.get("date");
                if (myDate) {
                    myDate = myDate.split("-");
                    myDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
                }
                return 0 - (10 - complaint.get("last_status") + "." + complaint.get("id"));
            },
            fetch: function(options) {
                return Alloy.Globals.addFetchErrorHandler(this, options);
            }
        });
        return Collection;
    }
};

model = Alloy.M("complaint", exports.definition, [ function(migration) {
    migration.name = "complaint";
    migration.id = "20160101000000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                id: "INTEGER PRIMARY KEY",
                title: "text",
                description: "text",
                date: "text",
                modified: "text",
                status: "text",
                pictures: "text",
                last_status: "integer",
                access_allowed: "integer"
            }
        });
    };
    migration.down = function(migrator) {};
}, function(migration) {
    migration.name = "complaint";
    migration.id = "20160411000000";
    migration.up = function(migrator) {
        migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN is_complaint INTEGER;");
    };
    migration.down = function(migrator) {};
} ]);

collection = Alloy.C("complaint", exports.definition, model);

exports.Model = model;

exports.Collection = collection;