for ( var i=0; /* no condition here */ ; i++ ) {
 document.getElementById( "numbers" ).innerHTML += "<li>" + i + " x 3 = " + (i * 3) +"</li>";
  if (i == 100) {
   break;
  }
}
