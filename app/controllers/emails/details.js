var args = arguments[0] || {};

args.data.attributes['message'] += "<style>*{ font-family: 'HelveticaNeue'; font-size: 14px; }</style>";

var attachment_row_height = 30;

if(args.data.attributes['attachments'].length > 0)
	$.attachments.show();
else{
	$.webview.top -= attachment_row_height;
	$.attachments.hide();
}

_.each(args.data.attributes['attachments'], function(attachment, attachment_key){
	var label = Ti.UI.createLabel({
	    text: attachment.name,
	    top: attachment_key == 0 ? 0 : attachment_key * attachment_row_height,
	    height: attachment_row_height,
	    left: 0,
	    right: 0
	});	
	
	label.addEventListener('click', function(){
		var win = Titanium.UI.createWindow({
		    title: L('emails_details_attachment_title')
		});
		
		var webview = Titanium.UI.createWebView({});
		
		Alloy.Globals.httpRequestAuthenticated('email/get-attachment/id/' + attachment.id + '/', {'returnData': true, 'onSuccess': function(result){
			webview.setData(result);
		}});
		
		win.add(webview);
		
		Alloy.Globals.current_nav_window.openWindow(win);
	});
	
	$.attachments_list.add(label);
});

$.attachments.setHeight(args.data.attributes['attachments'].length * attachment_row_height);
$.webview.setTop(100 + (args.data.attributes['attachments'].length * attachment_row_height));

$.emails.set(args.data.attributes);