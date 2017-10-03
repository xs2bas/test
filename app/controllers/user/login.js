var args = arguments[0] || {};

Titanium.App.addEventListener('resume', function () {  Alloy.Globals.toggleOfflineWindow(); });
Alloy.Globals.toggleOfflineWindow();
Alloy.Globals.loader.hide();

$.username.value = Alloy.Globals.keychainStorage.getString('userdata_username');

var users = Alloy.createCollection('user'); 

function tryLogin(){
	Alloy.Globals.loader.show(L('login_busy'));
	
	Alloy.Globals.toggleOfflineWindow(function(){
		doLogin();
	});
}

function showLoginError(){
	Ti.UI.createAlertDialog({
	    buttonNames: ['Ok'],
		title: L('login_unable_title'),
		message: L('login_unable_description')
	}).show();
}

function doLogin(){
	Alloy.Globals.keychainStorage.setString('userdata_username', $.username.value);
	Alloy.Globals.keychainStorage.setString('userdata_password', Titanium.Utils.sha1($.password.value).toUpperCase());
	
	var users = Alloy.createCollection('user'); 
	
	users.config.headers = Alloy.Globals.getAuthenticationHeaders();
	Alloy.Globals.updateInitializedCollections();
	
	$.password.value = '';
	
	users.fetch({
		success: function(result){
			Alloy.Globals.loader.hide();
			
        	if(users.models.length == 1)
        		Alloy.Globals.keychainStorage.setInt('userdata_id', users.models[0].id);
        	else{
        		showLoginError();
        		return false;
        	}
        	
        	Alloy.Globals.showPage('home');
       },
       
       error: function(){
       		Alloy.Globals.loader.hide();
       		showLoginError();
       }
	});
};