var request = require('request');
var config = require('../config');
var Record = require('../model/record');

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
    },

    sendMatrix: function(matrix, callback) {
        var _self = this;
        request.post(
            config.URL_GO_SERVER,
            { form: { matrix: matrix } },
            // Getting response from Go server
            function (error, response, json) {
                if (!error && response.statusCode == 200) {
                    responseObject = _self.extractResponse(json);
                }
                // Server error
                else {
                    responseObject = {
                        solved: false,
                        error: 'Server doesn\'t respond'
                    }
                }
                callback(responseObject);
            }
        );
    }
}
