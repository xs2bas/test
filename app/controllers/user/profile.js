var args = arguments[0] || {};


var validation_fields = [$.initials, $.phone_home, $.phone_cell, $.email];

var validation = require('validation');
var validator = new validation(validation_fields);

var saveButton = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.SAVE});
Alloy.Globals.current_window.setRightNavButton(saveButton);

saveButton.addEventListener('click', function(complaint) {
	saveProfile();
});

var tabbed_bar_elements = ['payment_type', 'bill'];

var users = Alloy.Collections.user;
$.user.fetch({
	success : function() {
		_.each(tabbed_bar_elements, function(tabbed_bar_element){
			Alloy.Globals.setTabbedBarValue($[tabbed_bar_element]);
		});
	},
});


$.bdate.addEventListener('click', function() {
	$.pickerView.show();
	
	$.picker.addEventListener('change', function(e){
		var date = e.value;
		var month = "" + (date.getMonth() + 1);
		
		if(month.length == 1)
			month = "0" + month;
		
		var day = "" + date.getDate();
		
		if(day.length == 1)
			day = "0" + day;
			
		$.bdate.value = day + '-' + month + '-' + date.getFullYear();
	});
});

$.pickerSave.addEventListener('click', function(){
	$.pickerView.hide();
});

if(Alloy.Globals.getSetting('general_company_shortname') == 'ravel'){
	$.payment_type_form_row.hide();
} else if (Alloy.Globals.getSetting('modules_tenantLogin_hide_collection_type') == '1') {
	$.payment_type_form_row.hide();
}

if(Alloy.Globals.getSetting('general_company_shortname') == 'ravel'){
	$.tableview.deleteRow($.payment_type_form_row);
	$.tableview.deleteRow($.bill_form_row);
}


function saveProfile() {
	validator.validateForm(function(){
		Alloy.Globals.confirm(L('user_profile_group_save'), L('user_profile_save_confirm_text'), function(){
			
			$.user.save({
				'password': $.password.value.length > 3 ? Titanium.Utils.sha1($.password.value).toUpperCase() : null,
				'initials': $.initials.value,
				'firstname': $.firstname.value,
				'middlename': $.middlename.value,
				'name': $.name.value,
				'bdate': $.bdate.value,
				'phone_home': $.phone_home.value,
				'phone_cell': $.phone_cell.value,
				'email': $.email.value,
				
				'user_address_address': $.user_address_address.value,
				'user_address_number': $.user_address_number.value,
				'user_address_zipcode': $.user_address_zipcode.value,
				'user_address_city': $.user_address_city.value,
				
				'iban': $.iban.value,
				'bic': $.bic.value,
		
				'payment_type': Alloy.Globals.getTabbedBarValue($.payment_type),
				'bill': Alloy.Globals.getTabbedBarValue($.bill)
			});
			
			Alloy.Globals.showPage('home');	
		});	
	});	
}

/*
function focusTextField() {
    $.itemField.focus();
}

function closeKeyboard(e) {
    e.source.blur();
}
*/