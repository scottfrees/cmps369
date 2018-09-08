$( document ).ready( function(){
  $.get("data/ch12_eg01.json", function( data ){
        $( "#container" ).html( "<h1>"+ data.title +"</h1>" );
  });
});