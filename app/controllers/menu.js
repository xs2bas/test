var args = arguments[0] || {};

if(!Alloy.Globals.menu)
	Alloy.Globals.menu = {
		
		'position': 'open',
		
		'toggle': function(menu_element, force_toggle){
			var self = this;
			
			var toggled_left_pos = Ti.Platform.displayCaps.platformWidth - 50;
			var toggle_to = force_toggle ? force_toggle : (self.position == 'open' ? 'close' : 'open');
			
			if(toggle_to == 'open'){
				menu_element.show();
			} else {
				menu_element.hide();
			}
			
			Alloy.Globals.menu.position = self.position == 'open' ? 'closed' : 'open';
		}
	};
	
	
var general_company = Alloy.Globals.getSetting('general_company');
$.menu_company_title.setText(general_company);

$.toggle.addEventListener('click', function(trigger) {
	Alloy.Globals.menu.toggle($.menu);
});

$.menuTable.addEventListener('click', function(trigger) {
	if(!trigger.rowData.page) return;
	
	Alloy.Globals.menu.toggle($.menu, 'close');
	Alloy.Globals.showPage(trigger.rowData.page);
});

Alloy.Globals.menu.toggle($.menu, 'close');