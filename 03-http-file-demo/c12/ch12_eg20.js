$( document ).ready( function(){
  $( "#slider" ).slider().on( "slidechange", function( e , ui ) {
		console.log( ui.value );
		$( "#slider" ).slider( "value" )
	});  
});