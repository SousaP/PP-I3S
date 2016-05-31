 function completeInteractoms(filter, master){
	$(filter).select2('val', 'All');
	$(filter).empty();
	$(filter).append("<option></option>");
	console.log("Deleting interactoms list");
    
	var name = $(master).val();
	console.log("Value is: " + $(master).val());
	//var filename = name.split(' ').join('_');

/*

	fs.readdir(path.join(__dirname, 'resources/BIOGRID/'), function (err, files) {
	  if (err) {
		console.log(err);
		return;
	  }
	  
	  for(var file = 0; file < files.length; file++){
		  if(files[file].indexOf(name) > -1){
			  $(filter).append("<option value=" + files[file] + ">" + files[file] + "</option>");
			  console.log("Appended the file: " + files[file]);
		  }
		  
		}
	}); */
}