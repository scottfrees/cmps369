$( document ).ready(function(){
  if ( $( "body" ).hasClass( "menu" ) ) {
    $( "#starters + div, #mains + div, #desserts + div").hide();
    if ( document.location.hash === "#starters" ) {
      $( "#starters" ).addClass( "expanded" ).next().show();
    } else if ( document.location.hash === "#mains" ) {
      $( "#mains" ).addClass( "expanded" ).next().show();
    } else if ( document.location.hash === "#desserts" ) {
      $( "#desserts" ).addClass( "expanded" ).next().show();
    } else {
      $( "#starters" ).addClass( "expanded" ).next().show();
    }
    $( "h2" ).on( "click", function(){
      if( !$( this ).hasClass( "expanded" )) {
        $( ".expanded" ).removeClass( "expanded" ).next().slideUp( "fast" );
        $( this ).addClass( "expanded" ).next().slideDown( "slow" );
      }
    });
  }
});