var args = arguments[0] || {};

var general_company = Alloy.Globals.getSetting('general_company');
Alloy.Globals.current_window.setTitle(general_company);
$.title.setText(String.format(L('home_message_title'), general_company));

var users_col = Alloy.createCollection('user');

users_col.fetch({
	success : function(col) {
		_.each(col.models, function(user_row){
			if(logo = user_row.get('corporation_logo'))
				$.logo.setImage(Alloy.Globals.getBackofficeUrl() + 'media/images/' + logo);
		});
	},
});
