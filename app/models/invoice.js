exports.definition = {
    config : {
        "columns": {
            "id":"INTEGER PRIMARY KEY",
            "identifier":"text",
            "translated_period": "text",
            'translated_period_en': 'text',
            "period": "text",
            "start": "INTEGER",
            "periodvalue": "integer",
            "amount": "integer",
            "payed": "integer",
            "closed": "integer",
            "modified": "text",
            'date': 'integer',
            'payment': 'text',
            'type': 'text',
            'hash': 'text',
            'id_transaction': 'integer' // transaction and transaction_id seem to be reserved names
            
            
            
        },
        "URL": function(){
        	Alloy.Globals.addToInitializedCollections(this);
        	return Alloy.Globals.getCollectionUrl(this);
        },
        "debug": 1, //debug mode enabled
        "useStrictValidation":1, // validates each item if all columns are present
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "invoice",
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
                    "amount" : Alloy.Globals.moneyFormat(this.get('amount')/100),
                    "payed" : self.getPayedString(this),
                    'translated_period': this.get('translated_period' + (Titanium.Locale.getCurrentLanguage() == 'en' ? '_en' : '')) 
                });
            },        	
        });
        return Model;
    },
    
    getPayedString: function(invoice){
    	
    	var payed_string = '-';
    	var timestamp = Date.now() / 1000 | 0;
    	
		if(invoice.get('type') == 'd'){
			payed_string = 'Ja';
		} else {
			
			if(invoice.get('payment') == 'ideal' || invoice.get('date') < timestamp){
		
				if(Alloy.Globals.getSetting('software_type') == 'energy' && !invoice.get('payed')){
					payed_string = 'Nee';
				} else {
					var percentage = (invoice.get('amount') > 0 ? Math.round((invoice.get('payed')/invoice.get('amount'))*100) : 0 );
					payed_string = percentage == 100 ? 'Ja' : percentage + "%";
				}
		
			} else if (invoice.get('payment') == 'collection' || invoice.get('date') >= timestamp){
				payed_string = 'Incasso'; // date toevoegen
			} else {
				var percentage = (invoice.get('amount') > 0 ? Math.round((invoice.get('payed')/invoice.get('amount'))*100) : 0 );
				payed_string = percentage == 100 ? 'Ja' : percentage + '%' ;
			}
		}
  	
    	return payed_string;
    },
     
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
			
            // Implement the comparator method.
    	    comparator : function(invoice) {
        	    return 0 - invoice.get('start');
           	},
            
        	fetch: function(options){         		
        		return Alloy.Globals.addFetchErrorHandler(this, options);
        	}
        }); // end extend
		
        return Collection;
    }
};