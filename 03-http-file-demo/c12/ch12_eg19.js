$( document ).ready( function(){
  $( "#progress" ).progressbar({
    "value" : 40
  }); 
	console.log( $( "#progress" ).progressbar( "value" ) ); 
});