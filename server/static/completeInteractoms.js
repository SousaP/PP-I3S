 var interactomsData = function (name) {
	var array = [];
	$.ajax({
		async: false,
		type: 'GET',
		url: 'folder/' + name,
		success: function(data) {
			array = data;
		}
	});
	return array;
}


function completeInteractoms(filter, master){
	$(filter).empty();
	//$('#glElem').val('');
	var name = $(master).val();
	//var filename = name.split(' ').join('_');


// create demo data
var dummyData = interactomsData(name);

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