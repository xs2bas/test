var args = arguments[0] || {};

$.phone.text = Alloy.Globals.getSetting('general_phone');
$.company.text = Alloy.Globals.getSetting('general_company');
$.website.text = Alloy.Globals.getSetting('general_website');
$.address.text = Alloy.Globals.getSetting('general_address_street') + ' ' + Alloy.Globals.getSetting('general_address_number')  + "\n" + Alloy.Globals.getSetting('general_address_zipcode') + ' ' + Alloy.Globals.getSetting('general_address_city');

var users_col = Alloy.createCollection('user');

users_col.fetch({
	success : function(col) {
		_.each(col.models, function(user_row){			
			$.project_emergency_phone.text = user_row.get('project_emergency_phone');
			$.email.text = user_row.get('corporation_email');
		});
	},
});

$.email.addEventListener('click', function(){
	Ti.Platform.openURL('mailto:'+$.email.text);
});

$.phone.addEventListener('click', function(){
	Ti.Platform.openURL('tel:'+$.phone.text.replace(/\D/g,''));
});

$.project_emergency_phone.addEventListener('click', function(){
	Ti.Platform.openURL('tel:'+$.project_emergency_phone.text.replace(/\D/g,''));
});

$.website.addEventListener('click', function(){
	Ti.Platform.openURL('http://' + $.website.text);
});