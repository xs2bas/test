exports.definition = {
    config : {
        "columns": {
            "id":"INTEGER PRIMARY KEY",
            "subject": "text",
            "message": "text",
            "date":"text",
            "stamp":"integer",
            "direction":"text",
            "attachments":"text"
        },
        "URL": function(){
        	Alloy.Globals.addToInitializedCollections(this);
        	return Alloy.Globals.getCollectionUrl(this);
        },
        "debug": 1, //debug mode enabled
        "useStrictValidation":1, // validates each item if all columns are present
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "email",
            "idAttribute" : "id",

            // optimise the amount of data transfer from remote server to app
            "addModifedToUrl": true,
            "lastModifiedColumn": "modified"
        },
        
        "headers": Alloy.Globals.getAuthenticationHeaders(),
        
        // delete all models on fetch
        "deleteAllOnFetch": true
    },
    extendModel : function(Model) {
    	var self = this;
    	
        _.extend(Model.prototype, {
			initialize : function() {
                this.set({
                    "direction_image" : 'images/icons/email-' + this.get('direction') + '.png',
                    "attachments" : this.get('attachments') ? JSON.parse(this.get('attachments')) : []
                });
            },         	
        });
        return Model;
    },
   
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
        	
            // Implement the comparator method.
    	    comparator : function(email) {
        	    return 0 - email.get('stamp');
           	},
            
        	fetch: function(options){         		
        		return Alloy.Globals.addFetchErrorHandler(this, options);
        	}      
        }); // end extend
		
        return Collection;
    }
};