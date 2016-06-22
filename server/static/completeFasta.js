 function completeFasta() {
	var specie = $('#slElem2').val();
	console.log(specie + "_fasta");
	$.ajax({
	  type: "POST",
	  url: 'changeFasta/' + specie + '_fasta.txt',
	  dataType: 'text'
	});
}