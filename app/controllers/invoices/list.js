var args = arguments[0] || {};

$.is.init($.invoiceList);
$.is.load();

function tableLoader(e) {
  loaderFunction(e, $.invoicesCollection);
}

function loaderFunction(e, collection) {  
	
    // get length before fetch
    var ln = collection.models.length;
    collection.fetch({
        // add to url params
        // result in e.g. example.com/todo?offset=0&limit=20
        urlparams : {
            limit : 20, // load 20 each iteration
            offset : ln
        },

        // Add to the collection - Don't reset it
        add : true,

        // lets keep the fetching under the radar
        silent : true,

        // return the exact results - so exact results
        returnExactServerResponse: true,

        // success callback
        success : function(col) {
            // if no new models have been added - lets call done.
            (col.models.length === ln) ? e.done() : e.success();
        },

        // error callback
        error : e.error
    });
}

$.invoiceList.addEventListener('click', function(invoice) {
	var detailController = Alloy.createController('invoices/details', {data : $.invoicesCollection.get(invoice.rowData.model)});
    Alloy.Globals.current_nav_window.openWindow(detailController.getView());
});

