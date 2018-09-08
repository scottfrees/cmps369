$( document ).ready( function(){
  $.ajax({
    "url" : "data/ch12_eg01.xml", 
	"dataType" : "xml",
    "success" : function( data ){
		var title = $( data ).find( "title" ).text();
		$( "#container" ).html( "<h1>"+ title +"</h1>" );
      }
  });
});