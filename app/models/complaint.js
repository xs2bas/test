exports.definition = {
    config : {
        "columns": {
            "id":"INTEGER PRIMARY KEY",
            "is_complaint":"integer",
            "title":"text",
            "description":"text",
            "date":"text",
            "modified":"text",
            "status":"text",
            "pictures":"text",
            "last_status": 'integer',
            'access_allowed': 'integer'
        },
        "URL": function(){
        	Alloy.Globals.addToInitializedCollections(this);
        	return Alloy.Globals.getCollectionUrl(this);
        },    
        "debug": 1, //debug mode enabled
        "useStrictValidation":1, // validates each item if all columns are present
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "complaint",
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
			initialize : function(){ 
				var status = new String(this.get('status'));
                this.set({
                    "pictures" : this.get('pictures') ? JSON.parse(this.get('pictures')) : [],
                    "is_complaint_label" : L('complaints_is_complaint_' + (this.get('is_complaint') ? 'yes' : 'no'), '-'),
                    'status': L('complaints_status_' + status.replace(' ', '_'), '-')
                });
            },         	
        });
        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {

    	    comparator : function(complaint) {
    	    	var myDate = complaint.get('date');
    	    	
    	    	if(myDate){
					myDate = myDate.split("-");
					myDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
				}
				
        	    return 0 - ((10 - complaint.get('last_status')) + '.' + complaint.get('id'));
            },
            
        	fetch: function(options){         		
        		return Alloy.Globals.addFetchErrorHandler(this, options);
        	}
        });
        return Collection;
    }
};