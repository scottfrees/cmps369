function calculateArea( width, height ) {
  var area = width * height;
  return area;
}

document.getElementById( "calc" ).onclick = function(){
  console.log( calculateArea( 
    document.getElementById( "width" ).value,
    document.getElementById( "height" ).value 
  ));
}