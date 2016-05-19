function completeGenes(){
	$("#glElem").empty();
	console.log("Deleting genes list");
	$('#glElem').append("<option></option>");
	var name = $('#slElem').val();
	console.log("Value is: " + $('#slElem').val());
	//var filename = name.split(' ').join('_');

	fs = require('fs');

	fs.readdir(path.join(__dirname, 'resources/fasta/'), function (err, files) {
	  if (err) {
		console.log(err);
		return;
	  }
	  
	  for(var file = 0; file < files.length; file++){
		  if(files[file].indexOf(name) > -1){
			  $('#glElem').append("<option value=" + name + ">" + files[file] + "</option>");
			  console.log("Appended the file: " + files[file]);
		  }
		  
		}
	});
}