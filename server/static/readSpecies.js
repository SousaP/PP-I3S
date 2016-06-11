var speciesData = function () {
var array = [];
	$.ajax({
     async: false,
     type: 'GET',
     url: 'resources/species_list.txt',
     success: function(data) {
      	var lines = data.split('\n');
		
		var item = {};
		for(var line = 0; line < lines.length; line++){
			item['id'] = lines[line].split(' ').join('_');
			item['text'] = lines[line];
			array.push(item);
			item = {};
		}
     }
});
	return array;
}


$(function () {
  // create demo data
  var dummyData = speciesData();
  // set initial value(s)


  // init select 2
  $('#slElem').select2({
    data             : dummyData,
    theme: "bootstrap",
    placeholder: "",
    maximumSelectionSize: 6,
    pagination: {more: true}
  });
});