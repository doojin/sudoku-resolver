function apply(app) {
	app.get('/', homepage);
}

// Project's homepage
function homepage(req, res) {
	res.type('text/plain');
	res.send('Hello, world!');
}

exports.apply = apply;