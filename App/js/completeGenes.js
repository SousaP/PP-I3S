function completeGenes(filter, master){
	$(filter).select2('val', 'All');
	$(filter).empty();
	$(filter).append("<option></option>");
	console.log("Deleting genes list");
	//$('#glElem').val('');
	var name = $(master).val();
	console.log("Value is: " + $(master).val());
	//var filename = name.split(' ').join('_');

	var fs = require('fs');

	var path = require('path');
	console.log(__dirname + 'resources/dictionary/' + name + '_dictionary.txt');
	var filePath = path.join(__dirname, 'resources/dictionary/' + name + '_dictionary.txt');

	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			console.log(data);
		var lines = data.split('\n');
		for(var line = 0; line < lines.length; line++){
			var temp = lines[line];
			if(temp.indexOf("#") > -1 || temp == ""){
				
			}
			else if(temp.split(' ').length == 1){
				$(filter).append("<option value=" + temp + ">" + temp + "</option>");
			}
			else{
				var spaces = temp.split('\t');
				$(filter).append("<option value=" + spaces[0] + ">" + spaces[1] + "</option>");
			}
		}
		}else{
			console.log(err);
		}

	});
}