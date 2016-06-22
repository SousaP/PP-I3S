 function createFastaFile(genes){
	var fs = require('fs');
	var path = require('path');
	var specie = $('#slElem').val();
	var filePath = 'resources/fasta/' + specie + '_fasta.txt';
	var fileName = 'resources/temp/modified_fasta_temp.txt';
	var def = genes.split('\n');

	$(function() {
		$.get('fasta/' + specie + '_fasta.txt', function(data) {
			var output = "# Temporary Fasta file\n\n";
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
			$.ajax({
			  type: "POST",
			  url: 'createFasta/modified_fasta_temp.txt',
			  data: output,
			  dataType: text
			});
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
			var output = "# Temporary Fasta file\n\n" + gene + '\n';
			var lines = data.split('\n');
			for(var line = 0; line < lines.length; line++){
				var temp = lines[line];
				if(temp.indexOf("#") > -1 || temp == ""){
					
				}
				else if(temp.indexOf(gene) > -1){
					var sep = temp.split('\t')
					if(sep[1] == gene){
						output = output + sep[0] + '\n';
					}
					else{
						output = output + sep[1] + '\n';
					}
				}
			}
			
			var element = document.createElement("pre");
			element.textContent = output;
			document.getElementById('s1').appendChild(element);
			
			var specie = $('#slElem').val();
			
			$.get('fasta/' + specie + '_fasta.txt', function(data) {
			var def = output.split('\n');
			var fasta = "# Temporary Fasta file\n\n";
			var lines = data.split('>');
			for(var line = 0; line < lines.length; line++){
				var temp = lines[line];
				if(temp.indexOf("#") > -1 || temp == ""){
					
				}
				for(var i = 0; i < def.length; i++){
					if ((temp.indexOf(def[i]) >= 0 || temp.toLowerCase().indexOf(def[i]) >= 0 
					|| temp.toUpperCase().indexOf(def[i]) >= 0) && def[i] != ""){
						fasta += ">" + temp;
					}
				}
				
			}
			console.log(fasta);
			createFastaFile(output);
			});
	});
});

}