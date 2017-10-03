var args = arguments[0] || {};

if(!Alloy.Globals.loader)
	Alloy.Globals.loader = {
		
		'show': function(message){
			$.activityIndicatorText.message = message;
			$.activityIndicator.show();
			$.activityIndicatorText.show();
		},
		
		'hide': function(){
			$.activityIndicator.hide();
			$.activityIndicatorText.hide();
		}
	};