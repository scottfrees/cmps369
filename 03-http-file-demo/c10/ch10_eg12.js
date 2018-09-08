var today = new Date();
var newyear = new Date( 2014,1,1 );
var remDays = ( newyear - today );
remDays = remDays/86400000;
document.body.innerHTML += "days until the new year: "+ remDays.toLocaleString();
