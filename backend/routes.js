var express = require('express');

function apply(app) {
	
	// Resolving static content (CSS, JS, images, etc.)
	app.use(express.static(__dirname + '/assets'));
	
	// Project's index (home) page
	app.get('/', function(req, res) {
		res.render('index');
	});
}

exports.apply = apply;