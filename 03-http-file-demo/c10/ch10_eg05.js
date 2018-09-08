var date = new Date(); 
var time = date.getHours(); 

if ( time < 12 ) {
  document.body.innerHTML += '<h1>Good Morning</h1>'; 
}
else {
  document.body.innerHTML += '<h1>Good Afternoon</h1>'; 
}

