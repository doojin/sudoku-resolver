var goserver = require('../goserver');

exports.test_extractResponse_shouldExtractSuccessfullResponse = function(test) {
    var json = '{"Status":true,"Matrix":[["1","2","3"],["1","2","3"],["1","2","3"]]}';
    var responseObject = goserver.extractResponse(json);
    var expectedMatrix = [
        ['1', '2', '3'],
        ['1', '2', '3'],
        ['1', '2', '3']
    ];
    test.equal(responseObject.solved, true);
    test.deepEqual(responseObject.matrix, expectedMatrix);
    test.equal(responseObject.message, 'Your sudoku was solved');
    test.deepEqual(responseObject.error, undefined);
    test.done();
};

exports.test_extractResponse_shouldExtractFailedResponse = function(test) {
    var json = '{"Status":false,"Error":"Something failed.."}';
    var responseObject = goserver.extractResponse(json);
    test.equal(responseObject.solved, false);
    test.equal(responseObject.error, 'Something failed..');
    test.equal(responseObject.message, undefined);
    test.equal(responseObject.matrix, undefined);
    test.done();
};
