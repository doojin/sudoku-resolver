var express = require('express');
var routes = require('./routes');

var app = express();

// Applying all routes
routes.apply(app);

app.listen(8080);
