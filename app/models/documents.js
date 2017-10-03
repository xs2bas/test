exports.definition = {
    config : {
        "columns": {
            "id":"INTEGER PRIMARY KEY",
            "title":"text",
            "date":"text",
            "version_id":"integer"
        },
        "URL": function(){
        	Alloy.Globals.addToInitializedCollections(this);
        	return Alloy.Globals.getCollectionUrl(this);
        },
        "debug": 1, //debug mode enabled
        "useStrictValidation":1, // validates each item if all columns are present
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "document",
            "idAttribute" : "id",

            // optimise the amount of data transfer from remote server to app
            "addModifedToUrl": true,
            "lastModifiedColumn": "modified"
        },
        
        "headers": _.extend(Alloy.Globals.getAuthenticationHeaders(), {'language': Titanium.Locale.getCurrentLanguage()}),
        
        // delete all models on fetch
        "deleteAllOnFetch": true
    },
    extendModel : function(Model) {
    	var self = this;
    	
        _.extend(Model.prototype, {
			initialize : function() {},        	
        });
        return Model;
    },
   
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
        	fetch: function(options){         		
        		return Alloy.Globals.addFetchErrorHandler(this, options);
        	}
        }); // end extend
		
        return Collection;
    }
};