$( document ).ready( function(){
  $.get( 'data/example1.json' , function( data ){
		var cells = data.cells,
				html = "<table>";
		for (var i = 0, len = cells.length; i < len; i++ ) {
			html += "<tr>";
			for (var j = 0; j < cells[i].length; j++){
				html += "<td>" + cells[i][j] +"</td.>";
			}  
			html += "<tr>";
		}
		html+="</table>";
		$( "#container" ).html( html );
	});  
});