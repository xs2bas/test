
var args = arguments[0] || {};


$.complaint.set(args.data.attributes);

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'black',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: L('complaints_add_picture_loading'),
  style: Ti.UI.ActivityIndicatorStyle.DARK
});

$.complaint_window.add(activityIndicator);


var first_picture = true;
_.each(args.data.attributes['pictures'], function(picture_id){
	addPicture(picture_id, first_picture);
	first_picture = false;
});

$.complaint_details_table.addEventListener('click', function(row){
	
});

function addPicture(picture_id, first_picture){
	var picture_section_index = 1;
	var pictures_section = $.pictures_section;
	var table = $.complaint_details_table;
	
	var row = Titanium.UI.createTableViewRow({
		'name': picture_id,
		//'selectionStyle': 'none'
	});
	
	activityIndicator.show();

	if(first_picture){
		row.add(Titanium.UI.createLabel({
			'left': 20,
			'width': '33%',
			'font': {
				'fontSize': '14dp'
			},
			'text': L('complaints_add_pictures')
		}));
	}
		
	
	var imageview = Titanium.UI.createImageView({
		'image': Alloy.Globals.getBackofficeUrl() + 'complaint/get-picture/id/' + picture_id + '/rest/1/',
		'height': 100,
		'left': '33%',
		'paddingLeft': 10,
		'paddingTop': 10,
		'paddingBottom': 10
	});
	
	imageview.addEventListener('load', function(){
		activityIndicator.hide();
	});
	
	row.add(imageview);
	
	imageview.addEventListener('click', function(){
		var imageController = Alloy.createController('complaints/showImage', {'picture_id': picture_id});
		Alloy.Globals.current_nav_window.openWindow(imageController.getView());
	});
	
	Alloy.Globals.appendRowToSection(table, row, picture_section_index);	
	
};