
console.log("I mom");
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'resources/species_list.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
	if (!err){
	var lines = data.split('\n');
	for(var line = 0; line < lines.length; line++){
	  $('#slElem').append("<option value=" + lines[line].split(' ').join('_') + ">" + lines[line] + "</option>");
	}
	}else{
		console.log(err);
	}

});