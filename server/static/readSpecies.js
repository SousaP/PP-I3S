
$(function() {
	$.get('resources/species_list.txt', function(data) {
		var lines = data.split('\n');
		for(var line = 0; line < lines.length; line++){
			$('#slElem').append("<option value=" + lines[line].split(' ').join('_') + ">" + lines[line] + "</option>");
			$('#slElem2').append("<option value=" + lines[line].split(' ').join('_') + ">" + lines[line] + "</option>");
		}
	});
});

