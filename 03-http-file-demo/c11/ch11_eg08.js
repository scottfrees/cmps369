$( document ).ready( function(){
  var date = new Date(); 
  var time = date.getHours();
  var elem; 

  if ( time < 12 ) {
    elem = $( "<h1 id='greeting'>Good Morning</h1>" ).hide(); 
  }
  else {
    elem = $( "<h1 id='greeting'>Good Afternoon</h1>" ).hide();   
  }
  $( "#container" ).append( elem );
  $( "#greeting").show( "slow" );
});
