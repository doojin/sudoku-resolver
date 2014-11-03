var express = require('express');
var request = require('request');
var helper = require('./lib/helper');
var goserver = require('./lib/goserver')
var config = require('./config');
var Record = require('./model/record');

function apply(app) {

	// Resolving static content (CSS, JS, images, etc.)
	app.use(express.static(__dirname + config.DIR_STATIC));

	// Project's index (home) page
	app.get('/', function(req, res) {
		res.render('index');
	});

	// List (history) of already solved sudoku
	app.get('/recent', function(req, res) {
		new Record().getLastRecords(config.HISTORY_INIT_COUNT, function(records) {
			res.render('recent', {
				records: records
			});
		});
	});

	app.post('/post-sudoku', function(req, res) {
		var responseObject;
		// Getting matrix from UI
		var matrix = req.body.matrix;
		var marked = helper.getMarked(JSON.parse(matrix));
		var now = Date.now();
		// Sending matrix to Go server
		request.post(
		    config.URL_GO_SERVER,
		    {
				form: {
					matrix: matrix
				}
			},
			// Getting response from Go server
		    function (error, response, json) {
		        if (!error && response.statusCode == 200) {
					responseObject = goserver.extractResponse(json);
					// Create new history record if sudoku was solved
					if (responseObject.solved) {
						var record = new Record({
							matrix: responseObject.matrix,
							marked: marked,
							ip: req.connection.remoteAddress,
							time: Date.now() - now
						});
						record.create();
					}
				}
				else {
					responseObject = {
						solved: false,
						error: 'Server doesn\'t respond'
					}
				}
				res.json(responseObject);
		    }
		);
	});
}

exports.apply = apply;
