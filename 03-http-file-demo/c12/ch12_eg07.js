$( document ).ready( function(){
  $( "#frmContact" ).on( "submit", function( e ){
    var $this = $( this );
    e.preventDefault();
    $.post( $this.attr("action"), $this.serialize(), function( data ){
	  if ( data.status === "accepted" ) {
		  $( "#frmContact" ).empty().html( "<h1>" + data.message + "</h1>" )
	  }
	});  
  });
});