$( document ).ready( function(){
  $( "dt" ).on( "click" , function(){
    $( this ).next().slideToggle();
  })
});
