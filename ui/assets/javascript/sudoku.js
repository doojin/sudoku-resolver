var sudoku = {

    table: null,

    // Initializes sudoku field inside the element
    init: function(element) {
        // Creating table
        var sudokuTable = document.createElement('table');
        this.table = sudokuTable;
        $(sudokuTable).attr('cellspacing', '0');
        $(sudokuTable).attr('cellpadding', '0');
        $(sudokuTable).addClass('sudoku');

        // Adding rows to table
        for (var i=0; i<9; i++) {
            var tr = document.createElement('tr');

            // Adding cells to rows
            for (var j=0; j<9; j++) {
                var td = document.createElement('td');
                var input = document.createElement('input');
                $(input).attr('type', 'text');
                $(input).attr('data-row', i);
                $(input).attr('data-col', j);
                $(td).append(input);
                $(tr).append(td);
            }

            $(sudokuTable).append(tr);
        }

        $(element).append(sudokuTable);
        this.resize();
    },

    // Makes sudoku field's height equal to width
    resize: function() {
        var width = $(this.table).width();
        $(this.table).css('height', width);
    }
}