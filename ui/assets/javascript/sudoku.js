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
		// Clearing all data of sudoko field
		$(tableId + ' input').val('');

		this.tableId = tableId;
		sudokuPresenter.resize(tableId);
	}
};
