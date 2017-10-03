// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.config = {
	'localhost': {	
		'backoffice': {
			'protocol': 'http://',
			'host': '192.168.1.71',
			'directory': 'omniboxx'
		},
		
		'styling': {
			'baseColor': '#706F74',// '#8EC540',
			'accentColor': '#c4a006',// '#8EC540',
			'homeBackgroundImage': 'ravel.jpg'// 'background.jpg'
		}
	},
	'ravel': {	
		'backoffice': {
			'protocol': 'https://',
			'host': 'my.studentexperience.nl',
			'directory': false
		},
		
		'styling': {
			'baseColor': '#706F74',
			'accentColor': '#c4a006',
			'homeBackgroundImage': 'ravel.jpg'
		}
	},
	'mvgm': {
		'backoffice': {
			'protocol': 'http://',
			'host': 'mvgm.omniboxx.nl',
			'directory': false
		},
		
		'styling': {
			'baseColor': '#0093DD',
			'accentColor': '#0093DD',
			'homeBackgroundImage': 'mvgm_jj.png'
		}
	}
};


Alloy.Globals.config = Alloy.Globals.config['ravel'];
Alloy.Globals.config.styling.homeBackgroundImage = 'images/' + Alloy.Globals.config.styling.homeBackgroundImage;
Alloy.Globals.smallScreen = Ti.Platform.displayCaps.platformWidth < 400; 

Alloy.Globals.addFetchErrorHandler = function(collection, options){
	options = options ? options : {};

	var original_error_callback = options.error ? options.error : false;
        		
	options.error = function(collection, e){
		
		if(e.code == 401){
			Alloy.Globals.removeLoginData();
			Alloy.Globals.showPage('user_login');
		}
		
		if(original_error_callback)
			original_error_callback();
	};

	options.returnErrorResponse = true;

	return Backbone.Collection.prototype.fetch.call(collection, options);
};

Alloy.Globals.removeLoginData = function(){
	Alloy.Globals.keychainStorage.removeProperty('userdata_password');
	Alloy.Globals.keychainStorage.removeProperty('userdata_id');
	
	var reset_collections = ['user'];
	for (i = 0; i < reset_collections.length; i++)
		Alloy.createCollection(reset_collections[i]).reset();	
};

Alloy.Globals.doLogout = function(){
	Alloy.Globals.confirm('Uitloggen', L('user_profile_logout_message'), function(){
		Alloy.Globals.removeLoginData();
		Alloy.Globals.showPage('user_login');
	});
};


Alloy.Globals.addImageToComplaint = function(){
	return Alloy.Globals.config.backoffice.protocol + Alloy.Globals.config.backoffice.host + '/' + (Alloy.Globals.config.backoffice.directory ? Alloy.Globals.config.backoffice.directory + '/' : '');
};


Alloy.Globals.getBackofficeUrl = function(){
	return Alloy.Globals.config.backoffice.protocol + Alloy.Globals.config.backoffice.host + '/' + (Alloy.Globals.config.backoffice.directory ? Alloy.Globals.config.backoffice.directory + '/' : '');
};

Alloy.Globals.getRestUrl = function(){
	return Alloy.Globals.getBackofficeUrl() + 'rest/';
};

Alloy.Globals.httpRequestAuthenticated = function(url, options){
	
 var client = Ti.Network.createHTTPClient({
 	
     onload : function(e) {
     	if(options.onSuccess)
     		if(options.returnData)
     			options.onSuccess(this.responseData);
     		else
     			options.onSuccess(this.responseText);
     	
     },
     
     onerror : function(e) {
     	if(options.onError)
     		options.onError(this.responseText);
     },
     timeout : 5000
 });
 
 client.open(options.postData ? 'POST' : "GET", Alloy.Globals.getBackofficeUrl() + url);
 
 _.each(Alloy.Globals.getAuthenticationHeaders(), function(header_value, header_name){
 	client.setRequestHeader(header_name,header_value);
 });
 
 if(options.postData){
 	//client.setRequestHeader('Content-Type', "multipart/form-data");
 	client.send(options.postData);
 } else
 	client.send();
};

Alloy.Globals.appendRowToSection = function(tableView, row, sectionIndex) {
    var sections = tableView.data;
    if (!sections || sections.length < sectionIndex || isNaN(+sectionIndex)) {
        return;
    }
    sections[sectionIndex].add(row);
    tableView.setData(sections);
};

Alloy.Globals.moneyFormat = function(amount){
	_.each(['€', '&euro;'], function(remove){
		amount = String(amount).replace(remove, '');
	});

	amount = new Number(amount);
	amount = amount.toFixed(2);
	amount = String(amount).replace('.', ',');
	
	if(amount.indexOf(',') != -1)
		amount = amount.substr(0, amount.indexOf(',')+3);

	return '€ ' + amount;
};

Alloy.Globals.initializedCollections = [];

Alloy.Globals.addToInitializedCollections = function(collection){
	Alloy.Globals.initializedCollections = _.uniq(_.union(Alloy.Globals.initializedCollections, [collection]));
};

Alloy.Globals.updateInitializedCollections = function(collection){
	_.each(Alloy.Globals.initializedCollections, function(collection){
		collection.headers = Alloy.Globals.getAuthenticationHeaders(); 
        collection.URL = Alloy.Globals.getCollectionUrl(collection);
	});
};

Alloy.Globals.getCollectionUrl = function(collection){
	var controller_url = collection.adapter.collection_name
    	.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "-" + y.toLowerCase(); })
    	.replace(/^_/, "");
        	
	return Alloy.Globals.getRestUrl() +  controller_url;
};

Alloy.Globals.getAuthenticationHeaders = function(){
	 var d = new Date();
	 
	var username = Alloy.Globals.keychainStorage.getString('userdata_username');
	var password = Alloy.Globals.keychainStorage.getString('userdata_password');
	var hostname = Alloy.Globals.config.backoffice.host;
	var date = d.toISOString();
	var hash_string = password + hostname + username + date;

	var crypto = require('crypto/crypto-js');

	return {
		'Usertype': 'tenant',	
    	'Authentication': username + ':' + crypto.HmacSHA256(password, hash_string),
    	'Date' : date
   };
};

var securely = require('bencoding.securely');
Alloy.Globals.keychainStorage = securely.createProperties({
	secret:"omniboxx_!!_app_##_secret_&&",
	identifier:"omniboxx_user_app",
    accessGroup:"omniboxx",
    encryptFieldNames:false
});

Alloy.Globals.isOnline;

Alloy.Globals.initializeSettings = function(success_callback){
	var db = Ti.Database.open('_alloy_');

	rows = db.execute('SELECT * FROM sqlite_master WHERE type="settings";');
	
	if(rows.isValidRow()){		
		db.execute('DELETE FROM settings');
		db.close();
		
		Alloy.createCollection('settings').reset();	
	}
	
	
	// force updating of settings	
	Alloy.createCollection('settings').fetch({
        success : function(result) {
        	if(success_callback)
        		success_callback(result);
        }
    });
};
 
Alloy.Globals.getSetting = function(name, fetchOptions){
	var settings = Alloy.Collections.instance('settings');
	
	settings.fetch({localOnly:true});
	
	if(setting = settings.where({'name':name}))
		if(setting[0])
			return setting[0].get('value');
		
	return null;
};

Alloy.Globals.checkConnection = function(online_callback, offline_callback){
	
	if(!Titanium.Network.online)
		return Alloy.Globals.toggleConnection(false, online_callback, offline_callback);
	
	Alloy.Globals.initializeSettings(function(){
		Alloy.Globals.toggleConnection(Alloy.Globals.getSetting('modules_app_enabled') == 1, online_callback, offline_callback);
	});
};

Alloy.Globals.toggleConnection = function(toggle, online_callback, offline_callback){
	
	var previous_is_online = Alloy.Globals.isOnline;
	Alloy.Globals.isOnline = toggle;
	
	if(toggle == true)
		online_callback(toggle !== previous_is_online);
	else
		offline_callback(toggle !== previous_is_online);
};

Alloy.Globals.confirm = function(title, text, callback_function){
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 1,
	    buttonNames: [L('confirm_dialog_button_confirm'), L('confirm_dialog_button_cancel')],
		message: text,
		title: title
	});
	  
	dialog.addEventListener('click', function(e){
		if (e.index === e.source.cancel) return
		
		callback_function();
	});
	
	dialog.show();	
};

Alloy.Globals.setTabbedBarValue = function(tabbed_bar){
	_.some(tabbed_bar.labels, function(label, index) {
		if (label.value === tabbed_bar.value) {
			tabbed_bar.index = index;
			return true;
		}
	});
};

Alloy.Globals.getTabbedBarValue = function(tabbed_bar){
	return tabbed_bar.labels[tabbed_bar.index] ? tabbed_bar.labels[tabbed_bar.index].value : false;
};
