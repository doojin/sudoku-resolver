var express = require('express');
var routes = require('./routes');
var middleware = require('./middleware');

var app = express();

// Applying all middleware
middleware.apply(app);

// Applying all routes
routes.apply(app);

app.listen(8080);
