var handlebars = require('express-handlebars');


function apply(app) {

	// Handlebars
	app.engine('handlebars', handlebars({defaultLayout: 'default'}));
	app.set('view engine', 'handlebars');
}

exports.apply = apply;