


$(document).ready ( function() {
    // setup event handler
    $('a').click(init_game);

    $('button').click( function() {
        // the button clicked has an input box as its sibling - so selecting that will allow us to pull
        // the input value from the correct text box.
        var input_value = $(this).siblings('input').val();
        console.log('guess = ' + input_value);

        var jax = $.post('guess', { guess : input_value });
        jax.done( function (data) {
            if ( data.result == 'success' ) {
                showSuccess();
                return;
            }
            
            // creating stuff is easier...  especially with the chaining syntax of jquery operations.
            if ( data.result == 'low' ) {
               $('<li/>').addClass('lowGuess').text(input_value + ' is too low').appendTo('ul');
            }
            else {
                $('<li/>').addClass('highGuess').text(input_value + ' is too high').appendTo('ul');
            }
            showCheck();
        })


        
    })

  
    init_game();
});


function init_game() {
    showStart();
    $('li').remove();
}




function showStart() {
    mask(true, false, false);
    $('input').val('');
}

function showCheck() {
    mask(false, true, false);
    $('input').val('');
}

function showSuccess() {
    mask(false, false, true);
}


function mask(start, check, success) {
    start ? $('#start_page').show() : $('#start_page').hide();
    check ? $('#check_page').show() : $('#check_page').hide();
    success ? $('#success_page').show() : $('#success_page').hide();
}