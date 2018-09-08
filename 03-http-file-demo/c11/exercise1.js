function calculateArea( width, height ) {
  var area = width * height;
  return area
}

$( "#calc" ).on( "click" , function(){
  $( "#results" ).html( calculateArea( 
    $( "#width" ).val(),
    $( "#height" ).val() 
  ));
});