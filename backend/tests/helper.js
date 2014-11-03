var helper = require('../lib/helper');

exports.test_getMarked_shouldReturnEmptyArrayIfArrayWithZeroValuesPassed = function(test) {
    var matrix = [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0']
    ];
    var marked = helper.getMarked(matrix);
    var expectedMarked = [];
    test.deepEqual(marked, expectedMarked);
    test.done();
}

exports.test_getMarked_shouldIndexesOfMarkedElements = function(test) {
    var matrix = [
        ['1', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '2', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '3', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '4', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '5', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '6', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '7', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '8', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '9']
    ];
    var marked = helper.getMarked(matrix);
    var expectedMarked = [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7],
        [8, 8]
    ];
    test.deepEqual(marked, expectedMarked);
    test.done();
}
