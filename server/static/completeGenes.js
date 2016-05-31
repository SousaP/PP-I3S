function completeGenes(filter, master){
	$(filter).select2('val', 'All');
	$(filter).empty();
	$(filter).append("<option></option>");
	console.log("Deleting genes list");
	//$('#glElem').val('');
	var name = $(master).val();
	console.log("Value is: " + $(master).val());
	//var filename = name.split(' ').join('_');
$(function() {
	$.get('dictionary/' + name + '_dictionary.txt', function(data) {
		var lines = data.split('\n');
		for(var line = 0; line < lines.length; line++){
			var temp = lines[line];
			if(temp.indexOf("#") > -1 || temp == ""){
				
			}
			else if(temp.split(' ').length == 1){
				$(filter).append("<option value=" + temp + ">" + temp + "</option>");
			}
			else{
				var spaces = temp.split('\t');
				$(filter).append("<option value=" + spaces[0] + ">" + spaces[1] + "</option>");
			}
		}
	});
});


}