module.exports = {
    extractResponse: function(responseJSON) {
        var responseObject = JSON.parse(responseJSON);
        var result = {};
        result.solved = responseObject.Status;
        // Sudoku was resolved
        if (responseObject.Status) {
            result.message = "Your sudoku was solved";
            result.matrix = responseObject.Matrix;
        }
        // Sudoku was not resolved
        else {
            result.error = responseObject.Error;
        }
        return result;
    }
}
