$( document ).ready( function(){
  $( "#slow" ).fadeIn( "slow" );
  $( "#fast" ).fadeIn( "fast" );
  $( "#ms" ).fadeIn( 1500 );
  $( "#toggle" ).on( "click" , function(){
    $( "#toggled" ).fadeToggle();
  });
});
