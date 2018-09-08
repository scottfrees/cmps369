$( document ).ready( function(){
  $( "#frmContact" ).validate(
    {"submitHandler" : function(){
      var $form = $( this.currentForm );
      $.post( $form.attr("action"), $form.serialize(), function( data ){
	      if ( data.status === "accepted" ) {
		      $( "#frmContact" ).empty().html( "<h1>" + data.message + "</h1>" )
	      }
	    });  
    }
  });
});