var MESSAGE_POSITION = 'bottom-right';
var MESSAGE_ERROR = 'error';
var MESSAGE_SUCCESS = 'success';
var MESSAGE_SHOW = 'showToast';

var ERROR_SERVER = 'Server can\'t respond right now';

var URL_PROCESS = '/post-sudoku';

var SOLVE_BUTTON_ID = '#solve';

$(document).ready(function() {
    var sudoku = new Sudoku('#sudoku');

    $(SOLVE_BUTTON_ID).on('click', function() {
        var _self = this;
        // Don't do anything if button is disabled
        if ($(this).hasClass('disabled')) return;
        // Disable button
        $(this).addClass('disabled');
        // Getting sudoku cells and sending them to the server
        var matrix = sudoku.getMatrix();
        var matrixJson = JSON.stringify(matrix);
        getSudokuResult(matrixJson, function(result) {
            $(_self).removeClass('disabled');
            processResult(sudoku, result);
        });
    });
});

// Getting result from server
function getSudokuResult(matrix, callback) {
    $.ajax({
        url: URL_PROCESS,
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
                error: ERROR_SERVER
            });
        }
    });
}

// Processing success / error
function processResult(sudoku, result) {
    if (result.solved) {
        sudoku.setMatrix(result.matrix);
        sudoku.freeze();
        $(SOLVE_BUTTON_ID).addClass('disabled');
        successMessage(result.message);
    } else {
        errorMessage(result.error);
    }
}

// Flashing success message
function successMessage(text) {
    $().toastmessage(MESSAGE_SHOW, {
        text: text,
        type: MESSAGE_SUCCESS,
        position: MESSAGE_POSITION
    });
}

// Flashing error message
function errorMessage(text) {
    $().toastmessage(MESSAGE_SHOW, {
        text: text,
        type: MESSAGE_ERROR,
        position: MESSAGE_POSITION
    });
}
