 function completeFasta() {
	var specie = $('#slElem2').val();
	var array = [];
	var output = "";
	$.ajax({
		async: false,
		type: 'GET',
		url: 'fasta/' + specie + '_fasta.txt',
		success: function(data) {
			var lines = data.split('\n');
			for(var line = 0; line < lines.length; line++){
				var temp = lines[line];
				if(temp.indexOf("#") > -1 || temp == ""){
					
				}
				else{
					output += temp;
				}
			}
			var lines = output.split('>');
			var num = 1;
			output = "";
			for(var line = 0; line < lines.length; line++){
				var temp = lines[line];
				if(temp.indexOf(">") > -1){
					output += ">seq" + num;
					num++;
				}
				else{
					output += temp;
				}
			}
		}
	});
	$.ajax({
	  type: "POST",
	  url: 'createFasta/codestemp.txt',
	  data: {'data': output},
	  dataType: 'text'
	});
}