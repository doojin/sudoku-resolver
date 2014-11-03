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

exports.getDate = function(timeDiff) {
    if (timeDiff < 1000) {
        return timeDiff + ' ms';
    }
    else if (timeDiff < 1000 * 60) {
        return Math.floor(timeDiff / 1000) + ' secs';
    }
    else if (timeDiff < 1000 * 60 * 60) {
        return Math.floor(timeDiff / 1000 / 60) + ' mins';
    }
    else if (timeDiff < 1000 * 60 * 60 * 24) {
        return Math.floor(timeDiff / 1000 / 60 / 60) + ' hrs';
    }
    else if (timeDiff < 1000 * 60 * 60 * 24 * 28) {
        return Math.floor(timeDiff / 1000 / 60 / 60 / 24) + ' days';
    }
    else {
        return Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 28) + ' monthes';
    }
};
