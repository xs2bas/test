var args = arguments[0] || {};


var validation_fields = [$.title];

var validation = require('validation');
var validator = new validation(validation_fields);

var pictures = [];

Alloy.Globals.setTabbedBarValue($.is_complaint);
$.is_complaint.addEventListener('click', function(){
	if(Alloy.Globals.getTabbedBarValue($.is_complaint) == '1'){
		$.access_allowed.hide();
		$.access_allowed_label.hide();
	} else {
		$.access_allowed.show();
		$.access_allowed_label.show();
	}
});


function openCamera(){
	var _picsTaken = 0;
      var timer = {};
 
    Titanium.Media.showCamera({
 
        saveToPhotoGallery : false,
        allowEditing : false,
        autohide : false, //Important!
 
        success : function(event) {     	
        	Ti.Media.hideCamera();
        	
			Alloy.Globals.httpRequestAuthenticated('complaint/upload-picture/rest/1/', {
				
				'postData':  {'image': event.media, 'complaint': args.id},
				
				'onSuccess': function(result){
					 
					if(result){
						pictures.push(result);
						addPicture(result);
					} else {
						alert(L('Opslaan van afbeelding mislukt, probeer het later nogmaals.'));
					}
				}.bind(this), 
				
				'onError': function(){
					alert(L('Opslaan van afbeelding mislukt, probeer het later nogmaals.'));
				}					
			});        	
        }
    });
}

var first_picture = true;
function addPicture(picture_id){
	var picture_section_index = 1;
	var pictures_section = $.pictures_section;
	var table = $.complaint_add_table;
	
	var row = Titanium.UI.createTableViewRow({
		'name': picture_id,
		//'selectionStyle': 'none'
	});

	if(first_picture){
		row.add(Titanium.UI.createLabel({
			'left': 20,
			'width': '33%',
			'font': {
				'fontSize': '14dp'
			},
			'text': 'Foto\'s'
		}));
	}
		
	
	var imageview = Titanium.UI.createImageView({
		'image': Alloy.Globals.getBackofficeUrl() + 'complaint/get-picture/id/' + picture_id + '/rest/1/',
		'height': 100,
		'left': '33%',
		'paddingLeft': 10,
		'paddingTop': 10,
		'paddingBottom': 10,
	});
	
	row.add(imageview);
	
	imageview.addEventListener('click', function(){
		var imageController = Alloy.createController('complaints/showImage', {'picture_id': picture_id});
		Alloy.Globals.current_nav_window.openWindow(imageController.getView());
	});	
	
	var delete_button = Titanium.UI.createButton({
		'right': 20,
		'color': '#ff0000',
		'title': L('complaints_add_delete')
	});
	
	delete_button.addEventListener('click', function(){
		
		Alloy.Globals.confirm(L('complaints_add_delete'), L('complaints_add_delete_message'), function(){
			Alloy.Globals.httpRequestAuthenticated('complaint/delete-picture/rest/1/', {
				
				'postData':  {'hash': picture_id},
				
				'onSuccess': function(result){
					pictures_section.remove(row);
					table.setData(table.data);
				}.bind(this)				
			});   
		});
		
	});
	
	row.add(delete_button);
	
	Alloy.Globals.appendRowToSection(table, row, picture_section_index);	
	first_picture = false;
};

function addItem() {
	validator.validateForm(function(){
		$.button_section_add.hide();
		$.button_section_cancel.hide();
	    var complaint = Alloy.Collections.instance('complaint');
	
	    // Create a new model for the todo collection
	    var complaint_item = Alloy.createModel('complaint', {
	    	status: 'Open',
	    	is_complaint: Alloy.Globals.getTabbedBarValue($.is_complaint),
	        title : $.title.value,
	        description : $.description.value,
	        pictures: JSON.stringify(pictures),
	        access_allowed: $.access_allowed.value
	    });
	    
	    // add new model to the global collection
	    complaint.add(complaint_item);
	
	    // save the model to persistent storage
	    complaint_item.save();
	
	    // reload the tasks
	    complaint.fetch({
	    	'success': function(){
	    		Ti.UI.createAlertDialog({
				    buttonNames: ['Ok'],
					message: L('complaints_add_confirm_save'),
					title: L('complaints_add_confirm_save_title')
				}).show();
	    		closeWindow();	
	    	}
	    });
	});
}


function focusTextField() {
    $.title.focus();
}

function closeKeyboard(e) {
    e.source.blur();
}

function closeWindow() {
    $.complaintAddWin.close();
}