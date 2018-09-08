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
  if ( $( "body" ).hasClass( "contact" ) ) {
    $( "#frmContact" ).validate(
      {"submitHandler" : function(){
        var $form = $( this.currentForm );
        $.post( $form.attr("action"), $form.serialize(), function( data ){
	        if ( data.status === "accepted" ) {
		         $( "#contact" ).empty().html( "<h2>" + data.message + "</h3>" )
	        }
	      });  
      }
    });
  }
});