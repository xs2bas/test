exports.definition = {
    config : {
        "columns": {
            "id":"INTEGER PRIMARY KEY",
            "modified":"text",
            
            "username":"text",
            "password":"text",
            
            "gender":"text",
            "initials":"text",
            "firstname":"text",
            "middlename":"text",
            "name":"text",
            "bdate":"text",
            "identification":"text",
            "phone_home": "text",
            "phone_cell": "text",
            "email": "text",
            
            "object_address_address": "text",
            "object_address_number": "text",
            "object_address_zipcode": "text",
            "object_address_city": "text",
            
            "date": "text",
            
            "user_address_address": "text",
            "user_address_number": "text",
            "user_address_zipcode": "text",
            "user_address_city": "text",
            
            "bill": "text",
            "iban": "text",
            "bic": "text",
            "payment_type": "text", 
            
            'project_emergency_phone': 'text',   
            'corporation_logo': 'text',
            'corporation_email': 'text'    
        },
        "URL": function(){
        	Alloy.Globals.addToInitializedCollections(this);
        	return Alloy.Globals.getCollectionUrl(this);
        },
        "debug": 1, //debug mode enabled
        "useStrictValidation":1, // validates each item if all columns are present
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "user",
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