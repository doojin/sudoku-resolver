$(document).ready(function() {
    var sudoku = new Sudoku('#game');
    sudoku.freeze();
    sudoku.setMatrix(matrix);
    sudoku.mark(marked);
});
