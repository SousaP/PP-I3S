var genesData = function (name) {
	var array = [];
	$.ajax({
		async: false,
		type: 'GET',
		url: 'dictionary/' + name + '_dictionary.txt',
		success: function(data) {
			var lines = data.split('\n');
			
			var item = {};
			var lines = data.split('\n');
			for(var line = 0; line < lines.length; line++){
				var temp = lines[line];
				if(temp.indexOf("#") > -1 || temp == ""){
					
				}
				else if(temp.split(' ').length == 1){
					item['id'] = temp;
					item['text'] = temp;
					array.push(item);
				}
				else{
					var spaces = temp.split('\t');
					item['id'] = spaces[0];
					item['text'] = spaces[1];
					array.push(item);
				}
				var item = {};
			}
		}
	});
	return array;
}


function completeGenes(filter, master){
	//$('#glElem').val('');
	var name = $(master).val();
	console.log("Value is: " + $(master).val());
	//var filename = name.split(' ').join('_');


// create demo data
var dummyData = genesData(name);

pageSize = 50

$.fn.select2.amd.require(["select2/data/array", "select2/utils"],

	function (ArrayData, Utils) {
		function CustomData($element, options) {
			CustomData.__super__.constructor.call(this, $element, options);
		}
		Utils.Extend(CustomData, ArrayData);

		CustomData.prototype.query = function (params, callback) {
			if (!("page" in params)) {
				params.page = 1;
			}

			var data = {};
			var temp = dummyData;
			if (params.term && params.term !== "") {
        // HEADS UP; for the _.filter function i use underscore (actually lo-dash) here
        temp = dummyData.filter(function (e) {
        	return (e.text.toUpperCase().indexOf(params.term.toUpperCase()) >= 0);
        });
    } else if (params.term === "") {
    	temp = dummyData;
    	console.log(temp);
    }



    data.results = temp.slice((params.page - 1) * pageSize, params.page * pageSize);
    data.pagination = {};
    data.pagination.more = params.page * pageSize < temp.length;
    callback(data);
};

$(filter).select2({
	ajax: {},
	dataAdapter: CustomData,
	theme: "bootstrap"
});

})
};
