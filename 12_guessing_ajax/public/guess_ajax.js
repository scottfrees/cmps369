

const init_game = () => {
    // Tell the server we'd like to initialize a new
    // game.  Once the server responds, set the UI up
    // appropriately.
    const request = $.post('start', {});

    request.done(function (data) {
        showStart();
        $('li').remove();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("start POST FAILED");
        console.error(textStatus);
        console.error(errorThrown);
    });
}

const mask = (start, check, success) => {
    start ? $('#start_page').show() : $('#start_page').hide();
    check ? $('#check_page').show() : $('#check_page').hide();
    success ? $('#success_page').show() : $('#success_page').hide();
}

const showStart = () => {
    mask(true, false, false);
    $('input').val('');
}

const showCheck = () => {
    mask(false, true, false);
    $('input').val('');
}

const showSuccess = () => {
    mask(false, false, true);
}



$(document).ready(function () {
    // setup event handler
    // If the user clicks "play again" we
    // don't actually reload the page... we just
    // reset.
    $('a').click(init_game);

    $('button').click(function () {
        // the button clicked has an input box as its sibling - so selecting that will allow us to pull
        // the input value from the correct text box.
        const input_value = $(this).siblings('input').val();
        console.log('guess = ' + input_value);

        const request = $.post('guess', { guess: input_value });
        request.done(function (data) {
            if (data.result == 'success') {
                showSuccess();
                return;
            }

            if (data.result == 'low') {
                $('<li/>').addClass('lowGuess').text(input_value + ' is too low').appendTo('ul');
            }
            else {
                $('<li/>').addClass('highGuess').text(input_value + ' is too high').appendTo('ul');
            }
            showCheck();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Guess POST FAILED");
            console.error(textStatus);
            console.error(errorThrown);
        });;
    })


    init_game();
});









