$( document ).ready( function(){
  $.ajax({
    "url" : "data/isAuthor.txt?author=rob%20larsen", 
	"dataType" : "text",
    "success" : function( data ){
	   if ( data === "true" ){
		  $.ajax({
            "url" : "data/ch12_eg04.txt", 
            "dataType" : "text",
            "success" : function( data ){
		       $( "#container" ).html( data );
            }
          });
		}
      }
  });
});