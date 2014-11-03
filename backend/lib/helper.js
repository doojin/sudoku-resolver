exports.getMarked = function(matrix) {
    var result = [];
    // Skanning for non-empty values
    for (var i=0; i<9; i++) {
        for (var j=0; j<9; j++) {
            var value = matrix[i][j];
            // Value is not empty
            if (value != '0') {
                var marked = [i, j];
                result.push(marked);
            }
        }
    }
    return result;
};
