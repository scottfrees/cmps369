function windowObject(){
  document.body.innerHTML += "<p><b>innerHeight</b>: " +
window.innerHeight + "</p>";

  document.body.innerHTML += "<p><b>innerWidth</b>: "+
window.innerWidth + "</p>";

  document.body.innerHTML += "<p><b>Color Depth</b>: "+
window.screen.colorDepth + "</p>";
}
window.onload = windowObject;