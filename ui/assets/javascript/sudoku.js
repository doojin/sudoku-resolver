sudokuPresenter = {
    handleNumberChange: function(element) {
        if ($(element).val()) {
            $(element).css('background-color', '#EEEEEE');
        } else {
            $(element).css('background-color', '#FFFFFF');
        }
    },

    resize: function(tableId) {
        var width = $(tableId).width();
        $(tableId).height(width);
    }
};

sudoku = {
	tableId: '',

	init: function(tableId) {
        this.tableId = tableId;
        this.clearField();
		sudokuPresenter.resize(this.tableId);
	},

    clearField: function() {
        $(this.tableId + ' input').val('');
    }
};
