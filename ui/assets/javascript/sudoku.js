function Sudoku(element) {
    Sudoku.count++;
    this.table = null;
    this.init(element);
    this.lastValue = '';
}

Sudoku.count = 0;

Sudoku.prototype.init = function(element) {
    var newClass = 'sudoku-table-' + Sudoku.count;
    var sudokuTable = document.createElement('table');
    $(sudokuTable).attr('cellspacing', '0');
    $(sudokuTable).attr('cellpadding', '0');
    $(sudokuTable).addClass('sudoku');
    $(sudokuTable).addClass(newClass);
    this.table = '.' + newClass;

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

    $(element).html(sudokuTable);
    
    this.resize();
    this.registerEventListeners();
};

// Making field's height equal to it's width
Sudoku.prototype.resize = function() {
    var width = $(this.table).width();
    $(this.table).css('height', width);
    
    var fontSize = (width / 18) + 'px';
    $(this.table + ' input').css('font-size', fontSize);
};

// If cell is empty setting it's background to white
// Otherwise, setting it's background to gray
Sudoku.prototype.changeCellBgIfNeed = function(cell) {
    if ($(cell).val()) {
        $(cell).addClass('active');
    } else {
        $(cell).removeClass('active');
    }
};

// Reverts value if it can't be put in this cell
Sudoku.prototype.revertValueIfNeed = function(cell) {
    var value = $(cell).val();
    // Empty value is always OK for any cell
    if (!value) {
        return;
    }
    var number = parseInt(value);
    
    if (this.containsNonNumericSymbols(value) || this.isNumberDiapasonWrong(number)) {
        $(cell).val(this.lastValue);
    }
};

// Checks if number is in diapason 1..9
Sudoku.prototype.isNumberDiapasonWrong = function(number) {
    if (number < 1 || number > 9) {
        return true;
    }
    return false;
};

Sudoku.prototype.containsNonNumericSymbols = function(value) {
    var validNumber = new RegExp(/^[0-9]+$/);
    return !validNumber.test(value);
};

// Gets cell by it's row and col indexes
Sudoku.prototype.getCellByIndex = function(row, col) {
    return $(this.table + ' input[data-row='+row+'][data-col='+col+']');
};

Sudoku.prototype.registerEventListeners = function() {
    var _self = this;
    
    // Resize Sudoku field on window resize
    $(window).resize(function() {
        _self.resize();
    });
    
    $(this.table + ' input').on('focus', function() {
        _self.lastValue = $(this).val();
    });
    
    $(this.table + ' input').on('input', function() {
        var row = $(this).data('row');
        var col = $(this).data('col');
        var cell = _self.getCellByIndex(row, col);
        _self.revertValueIfNeed(cell);
        _self.changeCellBgIfNeed(cell);
        _self.lastValue = $(cell).val();
    });
};