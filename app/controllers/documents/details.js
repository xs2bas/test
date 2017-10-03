var args = arguments[0] || {};

Alloy.Globals.httpRequestAuthenticated('document/download/rest/1/id/' + args.data.attributes.id + '/version/' + args.data.attributes.version_id + '/', {'returnData': true, 'onSuccess': function(result){
    
	$.webview.setData(result);
}});