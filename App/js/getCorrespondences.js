 function createFastaFile(genes){
	var fs = require('fs');
	var path = require('path');
	var specie = $('#slElem').val();
	var filePath = path.join(__dirname, 'resources/fasta/' + specie + '_fasta.txt');
	var fileName = path.join(__dirname, 'resources/temp/modified_fasta_temp.txt');
	var def = genes.split('\n');
	
	
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			var output = "# Temporary Fasta file\n\n";
			console.log(data);
			var lines = data.split('>');
			console.log(lines);
			for(var line = 0; line < lines.length; line++){
				var temp = lines[line];
				if(temp.indexOf("#") > -1 || temp == ""){
					
				}
				for(var i = 0; i < def.length; i++){
					if ((temp.indexOf(def[i]) >= 0 || temp.toLowerCase().indexOf(def[i]) >= 0 
					|| temp.toUpperCase().indexOf(def[i]) >= 0) && def[i] != ""){
						output += ">" + temp;
					}
				}
				
			}
			
			fs.writeFile(fileName, output, function (err) {
			   if(err){
				   alert("An error ocurred creating the file "+ err.message)
				   }
			   });
			
		}else{
			console.log(err);
		}

	});
 }
 
 function getCorrespondences(filter, master){
    
	var gene = $(filter).val();
	var interactome = $(master).val();
	console.log("Gene is: " + gene + " --> File is: " + interactome);
	//var filename = name.split(' ').join('_');

	var fs = require('fs');

	var path = require('path');
	console.log(__dirname + 'resources/BIOGRID/' + interactome);
	var filePath = path.join(__dirname, 'resources/BIOGRID/' + interactome);
	var fileName = path.join(__dirname, 'resources/temp/initial_interactions_temp.txt');

	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			var output = gene + '\n';
			console.log(data);
			var lines = data.split('\n');
			for(var line = 0; line < lines.length; line++){
				var temp = lines[line];
				if(temp.indexOf("#") > -1 || temp == ""){
					
				}
				else if(temp.indexOf(gene) > -1){
					var sep = temp.split('\t')
					output = output + sep[1] + '\n';
				}
			}
			
			var element = document.createElement("pre");
			element.textContent = output;
			document.getElementById('s1').appendChild(element);
			
			fs.writeFile(fileName, output, function (err) {
			   if(err){
				   alert("An error ocurred creating the file "+ err.message)
				   }
			   });
			
			createFastaFile(output);
			
		}else{
			console.log(err);
		}

	});
}