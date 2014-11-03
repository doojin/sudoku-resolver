var express = require('express');

function apply(app) {

	// Resolving static content (CSS, JS, images, etc.)
	app.use(express.static(__dirname + '/assets'));

	// Project's index (home) page
	app.get('/', function(req, res) {
		res.render('index');
	});

	// List (history) of already solved sudoku
	app.get('/recent', function(req, res) {
		res.render('recent');
	});

	app.post('/post-sudoku', function(req, res) {
		var response = {
			solved: true,
			message: 'Your sudoku was solved',
			matrix: [
				['1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1'],
				['1', '1', '1', '1', '1', '1', '1', '1', '1']
			]
		};
		res.json(response);
	});
}

exports.apply = apply;
