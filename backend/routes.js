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
		res.render('recent');
	});

	app.post('/post-sudoku', function(req, res) {
		var responseObject;
		// Getting matrix from UI
		var matrix = req.body.matrix;
		var marked = helper.getMarked(JSON.parse(matrix));
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
					var record = new Record({
						matrix: responseObject.matrix,
						marked: marked
					});
					record.create();
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
