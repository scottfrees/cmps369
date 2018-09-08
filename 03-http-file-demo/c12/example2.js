$( document ).ready( function(){
  $( "#subjects li" ).draggable({ 
		  "revert" : true 
	});
	$( "#target" ).droppable({ 
		  "drop" : function( e, ui){
				$("#subject").text($(ui.draggable).text());		
			} 
	});
});