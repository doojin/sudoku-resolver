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
		new Record().getLastRecords(config.HISTORY_COUNT, function(records) {
			res.render('recent', {
				records: records
			});
		});
	});

	app.post('/post-sudoku', function(req, res) {
		// Getting matrix from request
		var matrix = req.body.matrix;
		var now = Date.now();
		// Sending matrix to Go server
		goserver.sendMatrix(matrix, function(responseObject) {
			// Save to database if sudoku is solved
			if (responseObject.solved) {
				new Record({
					matrix: responseObject.matrix,
					marked: helper.getMarked(JSON.parse(matrix)),
					ip: req.connection.remoteAddress,
					time: Date.now() - now
				}).create();
			}
			// Sending response back to client
			res.json(responseObject);
		});
	});
}

exports.apply = apply;
