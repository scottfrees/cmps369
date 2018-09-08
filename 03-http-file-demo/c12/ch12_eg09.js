$( document ).ready( function(){
 $( "#draggable" ).draggable();
 $( "#droppable" ).droppable( {
  drop: function( event, ui ) {
    $( this ).css( "border" , "4px solid hotpink" ).html( "<p>Dropped!</p>" );
  }
  }); 
});