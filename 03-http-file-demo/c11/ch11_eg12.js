$( document ).ready( function(){
  var newLI;
  $( "#contact a" ).attr({
    "href" : "http://htmlcssjavascript.com/",
    "title" : "Visit Rob's blog about web technology",
    "rel" : "me",
    "id" : "htmlcssjavascript"
  });
  newLI = $("<li>").text( $( "#contact a" ).attr("title") );
  $( "ul").append( newLI );

});