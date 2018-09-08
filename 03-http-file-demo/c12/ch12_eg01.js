$( document ).ready( function(){
  $.ajax({
    "url" : "data/ch12_eg01.json", 
    "success" : function( data,status,jqxhr ){
        console.log( data,status,jqxhr )
      }
  });
});