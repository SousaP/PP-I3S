 function completeInteractoms(){
	$("#ilElem").empty();
	console.log("Deleting interactoms list");
	$('#ilElem').append("<option></option>");
	$('#ilElem').each(function () {
    if (this.defaultSelected) {
        this.selected = true;
        return false;
    }
	});
	var name = $('#glElem').val();
	console.log("Value is: " + $('#glElem').val());
	//var filename = name.split(' ').join('_');

	fs = require('fs');

	fs.readdir(path.join(__dirname, 'resources/BIOGRID/'), function (err, files) {
	  if (err) {
		console.log(err);
		return;
	  }
	  
	  for(var file = 0; file < files.length; file++){
		  if(files[file].indexOf(name) > -1){
			  $('#ilElem').append("<option value=" + name + ">" + files[file] + "</option>");
			  console.log("Appended the file: " + files[file]);
		  }
		  
		}
	});
}