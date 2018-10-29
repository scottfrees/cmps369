// Global, will hold the secret value computed each time
// we arrive in the initialization state (first page load, or play again)
let secret;



const clearGuesses = () => {
    const ps = document.getElementsByTagName('li');
    for ( var i = ps.length-1; i >= 0; i-- ) {
        var p = ps[i];
        p.parentNode.removeChild(p);
    }
}

const showStart = () => {
    console.log("Showing start page");
    mask('block', 'none', 'none');
    document.getElementById('start_guess').value = '';
}
const showCheck = () => {
    console.log("Showing check page.");
    mask('none', 'block', 'none');
    document.getElementById('check_guess').value = '';
}

const showSuccess = () => {
    console.log("Showing success page");
    mask('none', 'none', 'block');
}


const mask = (start, check, success) => {
    let page = document.getElementById('start_page');
    page.style.display = start;

    page = document.getElementById('check_page');
    page.style.display = check;

    page = document.getElementById('success_page');
    page.style.display = success;
}

const init_game = () => {
    // come up with a random number
    secret = Math.floor(Math.random() *10) + 1;
    console.log('Secret number = ' + secret);
    showStart();
    clearGuesses();
}

const on_guess = (input_id) => {
    const input = document.getElementById(input_id);
    if ( input.value == secret ) {
        showSuccess();
        return;
    }
    
    // there is only one ul element... so ok.
    const list = document.getElementsByTagName('ul')[0];
    const li = document.createElement('li');
    let text;
    if ( input.value < secret ) {
       text = document.createTextNode(input.value + ' is too low');
       li.className = 'lowGuess';
    }
    else {
        text = document.createTextNode(input.value + ' is too high');
        li.className = 'highGuess';
    }
    li.appendChild(text);
    list.appendChild(li);
    showCheck();
}



