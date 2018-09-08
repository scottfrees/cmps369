$( document ).ready( function(){
  $.ajax({
    "url" : "data/ch12_eg01.json", 
    "success" : function( data ){
        $( "#container" ).html( "<h1>"+ data.title +"</h1>" );
      }
  });
});