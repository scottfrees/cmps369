$( document ).ready( function(){
  var date = new Date(); 
  var time = date.getHours();
  var elem; 

  if ( time < 12 ) {
    elem = $( "<h1>" ).text( "Good Morning" ).attr( "id","greeting" ).hide(); 
  }
  else {
    elem = $( "<h1>" ).text( "Good Afternoon" ).attr( "id","greeting" ).hide();   
  }
  $( "#container" ).append( elem );
  $( "#greeting").show( "slow" );
});
