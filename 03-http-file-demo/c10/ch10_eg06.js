function checkAnimal() {
  switch ( document.getElementById( "txtAnimal" ).value.toLowerCase() ){
    case "rabbit": 
      alert( "Watch out, it's Elmer Fudd!" );
    break;
    case "coyote": 
      alert( "No match for the road runner - meep meep!" );
    break;
    case "mouse": 
      alert( "Watch out Jerry, here comes Tom!" );
    break;
    default : alert("Are you sure you picked an animal from a cartoon?");
  } 
}
document.getElementById( "check" ).onclick = checkAnimal;
