var speciesData = function () {
	$.get('resources/species_list.txt', function(data) {
		var lines = data.split('\n');
		var array = [];
		var item = {};
		for(var line = 0; line < lines.length; line++){
			item['id'] = lines[line].split(' ').join('_');
			item['text'] = lines[line];
			array.push(item);
			item = {};
		}
		return array;
	});
}

$(function() {
	var ret = speciesData();
	console.log(ret);
});

