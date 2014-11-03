var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');


function apply(app) {

	// Handlebars
	app.engine('handlebars', handlebars({
		defaultLayout: 'default',
		helpers: {
			section: function(name, options) {
				if (!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	}));
	app.set('view engine', 'handlebars');

	// Body parser
	app.use(bodyParser.urlencoded({
		extended: true
	}));
}

exports.apply = apply;
