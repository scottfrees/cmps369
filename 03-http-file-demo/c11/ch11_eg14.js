$( document ).ready( function(){
  var methods = [ "attr()","css()","html()","addClass()","removeClass()","hasClass()","toggleClass()"  ];
  var list = "";
  for ( var i = 0, len = methods.length; i < len; i++ ){
    list += "<li>" + methods[ i ] +"</li>";
  } 
  $( "#methods" ).html( list );
});