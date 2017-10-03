
Alloy.Globals.toggleOfflineWindow = function(online_callback){
	
	Alloy.Globals.checkConnection(
		function(status_changed){
			
			if(status_changed){
				$.offline_window.close();
				Alloy.Globals.current_nav_window.show();
			}
			
			if(online_callback) online_callback(status_changed);
		},
		function(status_changed){
			if(status_changed){
				$.offline_window.open();
				Alloy.Globals.current_nav_window.hide();
				Alloy.Globals.loader.hide();
			}
		}
	);
};

$.check_online_button.addEventListener('click', function(){
	Alloy.Globals.toggleOfflineWindow();
});

Alloy.Globals.showPage = function (short_page_name){
	
	var pages = [
		'user_login',
		'home',
		'user_profile',
		'invoices_list',
		'documents_list',
		'emails_list',
		'complaints_list',
		'contact'
	];
	
	var page_name = 'page_' + short_page_name;
	
	for (var i = 0, len = pages.length; i < len; i++) {
		page_element = $['page_' + pages[i]];
		page_window_element = $['page_' + pages[i] + '_window'];
		
    	if(page_element.id == page_name){
			page_element.open();
			page_element.show();
			var controller_name = short_page_name.indexOf('_') === false ? short_page_name : short_page_name.replace('_', '/');
			
			Alloy.Globals.current_nav_window = page_element;
			Alloy.Globals.current_window = page_window_element;
			
			page_window_element.add(Alloy.createController(controller_name).getView());
			   		
    	} else {
    		page_element.close();
    		page_element.hide();
    	}
	}
};

//Alloy.Globals.keychainStorage.removeProperty('userdata_id');

Alloy.Globals.initializeSettings(function(){
	if(Alloy.Globals.keychainStorage.hasProperty('userdata_id'))
		Alloy.Globals.showPage('home');
	else
		Alloy.Globals.showPage('user_login');
});