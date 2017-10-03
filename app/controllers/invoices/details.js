var args = arguments[0] || {};

var secret = Titanium.Utils.sha1(args.data.attributes.id_transaction + '_secret_' + args.data.attributes.hash);
$.webview.setUrl(Alloy.Globals.getBackofficeUrl() + 'invoice/export/hash/' + args.data.attributes.hash + '/s/' + secret + '/');