 function getCorrespondences(filter, master){
    
	var gene = $(filter).val();
	var interactome = $(master).val();
	console.log("Gene is: " + interactome + " --> File is: " + gene);
	//var filename = name.split(' ').join('_');

	var fs = require('fs');

	var path = require('path');
	console.log(__dirname + 'resources/BIOGRID/' + interactome);
	var filePath = path.join(__dirname, 'resources/BIOGRID/' + interactome);

	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			console.log(data);
			var lines = data.split('\n');
			for(var line = 0; line < lines.length; line++){
				var temp = lines[line];
				if(temp.indexOf("#") > -1 || temp == ""){
					
				}
				else if(temp.indexOf(gene) > -1){
					
				}
			}
		}else{
			console.log(err);
		}

	});
}