$(document).ready(function() {
    var sudoku = new Sudoku('#sudoku');

    $('#solve').on('click', function() {
        var _self = this;
        // Don't do anything if button is disabled
        if ($(this).hasClass('disabled')) return;
        // Disable button
        $(this).addClass('disabled');
        // Getting sudoku cells and sending them to the server
        var matrix = sudoku.getMatrix();
        var matrixJson = JSON.stringify(matrix);
        getSudokuResult(matrixJson, function(result) {
            processResult(result);
            $(_self).removeClass('disabled');
        });
    });
});

// Getting result from server
function getSudokuResult(matrix, callback) {
    $.ajax({
        url: '/post-sudoku',
        type: 'POST',
        data: {
            matrix: matrix
        },
        success: function(data) {
            callback(data);
        },
        error: function(data) {
            callback({
                solved: false,
                error: 'Server can\'t respond right now'
            });
        }
    });
}

// Processing success / error
function processResult(result) {
    if (result.solved) {
        successMessage(result.message);
    } else {
        errorMessage(result.error);
    }
}

// Flashing success message
function successMessage(text) {
    $().toastmessage('showToast', {
        text: text,
        type: 'success',
        position: 'bottom-right'
    });
}

// Flashing error message
function errorMessage(text) {
    $().toastmessage('showToast', {
        text: text,
        type: 'error',
        position: 'bottom-right'
    });
}
