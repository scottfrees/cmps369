$( document ).ready( function(){
  $( "h1" ).css({
    "font-size" : "200%",
    "color" : "#ffffff", 
    "height" : "100px",
    "width" : "500px",
    "background-color" : "#61b7ff", 
    "border" : "10px solid #003366"
  });
  $( "#result" ).text( $( "h1" ).css ( "border" ) );
});