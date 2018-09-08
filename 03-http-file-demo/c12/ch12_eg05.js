$( document ).ready( function(){
  $.ajax({
	"type" : "get",  
    "url" : "data/ch12_eg01.json", 
    "success" : function( data ){
        $( "#container" ).html( "<h1>"+ data.title +"</h1>" );
      }
  });
});