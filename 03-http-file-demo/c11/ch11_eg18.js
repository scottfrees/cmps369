$( document ).ready( function(){
  function toggler(){
    $( this ).next().slideToggle();
  }
  $( "button" ).on( "click" , function(){ 
    $( "dt" ).trigger( "click" ).off( "click" , toggler );  
  });
  $( "dt" ).on( "click" , toggler )
});
