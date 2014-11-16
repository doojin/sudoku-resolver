var express = require('express');
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

	// Solving sudoku
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

	// List (history) of already solved sudoku
	app.get('/recent', function(req, res) {
		new Record().getLastRecords(config.HISTORY_COUNT, function(records) {
			var filteredRecords = [];
			// Filtering records
			records.forEach(function(record) {
				var date = record.date;
				var now = Date.now();
				var dateDiff = now - new Date(date);
				var r = {
					order: record.order,
					date: helper.getDate(dateDiff) + ' ago',
					ip: record.ip,
					time: helper.getDate(record.time)
				};
				filteredRecords.push(r);
			});
			res.render('recent', {
				records: filteredRecords
			});
		});
	});

	// Displaying already solved sudoku
	app.get('/game/:order([0-9]+)', function(req, res) {
		var order = req.params.order;
		new Record().getRecordByOrder(order, function(record) {
			// Game with this order doesn't exist
			if (!record) {
				res.redirect(303, '/recent');
				return;
			}
			// Game exists
			res.render('game', {
				matrix: JSON.stringify(record.matrix),
				marked: JSON.stringify(record.marked)
			});
		});
	});
	
	app.get('/rules', function(req, res) {
		res.render('rules');	
	});
}

exports.apply = apply;
