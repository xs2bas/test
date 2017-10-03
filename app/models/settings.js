exports.definition = {
    config : {
        "columns": {
            "id":"INTEGER PRIMARY KEY",
            "name":"text",
            "value":"text",
            "modified":"text"
        },
        "URL": function(){
        	Alloy.Globals.addToInitializedCollections(this);
        	return Alloy.Globals.getCollectionUrl(this);
        }, 
        "debug": 1, //debug mode enabled
        "useStrictValidation":1, // validates each item if all columns are present
        "initFetchWithLocalData":0,
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "settings",
            "idAttribute" : "id",

            // optimise the amount of data transfer from remote server to app
            "addModifedToUrl": true,
            "lastModifiedColumn": "modified"
        },
        
        "headers": Alloy.Globals.getAuthenticationHeaders(),
        
        // delete all models on fetch
        "deleteAllOnFetch": true,
        "returnErrorResponse": true
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
        	fetch: function(options){         		
        		return Alloy.Globals.addFetchErrorHandler(this, options);
        	}
        });
        return Collection;
    }
};