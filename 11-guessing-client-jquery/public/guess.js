// Global, will hold the secret value computed each time
// we arrive in the initialization state (first page load, or play again)
let secret;


const init_game = () => {
    $('input').val('');
    secret = Math.floor(Math.random() * 10) + 1;
    console.log(secret);
    showStart();
    $('li').remove(); // clears the guesses.
}

const mask = (start, check, success) => {
    start ? $("#start_page").show() : $("#start_page").hide();
    check ? $("#check_page").show() : $("#check_page").hide();
    success ? $("#success_page").show() : $("#success_page").hide();

}

const showStart = () => {
    mask(true, false, false);
    console.log("Showing start page");
}

const showSuccess = () => {
    mask(false, false, true);
    console.log("Showing success");
}

const showCheck = () => {
    $('input').val('');
    mask(false, true, false);
    console.log("Showing check");
}




$(document).ready(function() {

    init_game();
    console.log($('button'));
    $('button').click(function() {
        const guess = $(this).siblings('input').val()
        console.log("Guess is " + guess);

        if (guess == secret) {
            showSuccess();
            return;
        }
        else if (guess < secret) {
            // show check, also add li element
            $('<li/>')
                .addClass('lowGuess')
                .text(guess + ' was too low')
                .appendTo('ul');
        }
        else {
            $('<li/>')
                .addClass('highGuess')
                .text(guess + ' was too high')
                .appendTo('ul');
        }
        showCheck();
    });

    $('a').click(function() {
        init_game();
    });
});
