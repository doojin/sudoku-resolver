$(document).ready(function() {
    var tableId = '#sudoku';

    initMenu();

    sudoku.init(tableId);

    // Resizing sudoku field on windows resize
    $(window).on('resize', function() {
        sudokuPresenter.resize(tableId)
    });

    // Changing cell's appearance depending on input value
    $('#sudoku input').on('input', function() {
        sudokuPresenter.handleNumberChange(this);
    });
});