 function createFastaFile(genes){
	var fs = require('fs');
	var path = require('path');
	var specie = $('#slElem').val();
	var filePath = path.join(__dirname, 'resources/fasta/' + specie + '_fasta.txt');
	var fileName = path.join(__dirname, 'resources/temp/modified_fasta_temp.txt');
	var def = genes.split('\n');

	$(function() {
	$.get('fasta/' + specie + '_fasta.txt', function(data) {
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
	});
});
	
 }
 
 function getCorrespondences(filter, master){
    
	var gene = $(filter).val();
	var interactome = $(master).val();
	console.log("Gene is: " + gene + " --> File is: " + interactome);
	//var filename = name.split(' ').join('_');


	$(function() {
	$.get('BIOGRID/' + interactome, function(data) {
	var output = "# Temporary Fasta file\n\n";
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
					
			createFastaFile(output);
	});
});

}