$( document ).ready(function(){
  if ( $( "body" ).hasClass( "menu" ) ) {
    $( "#mains + div, #desserts + div").hide();
    $( "#starters" ).addClass( "expanded" );
    $( "h2" ).on( "click", function(){
      if( !$( this ).hasClass( "expanded" )) {
        $( ".expanded" ).removeClass( "expanded" ).next().slideUp( "fast" );
        $( this ).addClass( "expanded" ).next().slideDown( "slow" );
      }
    });
  }
});