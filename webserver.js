var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();
app.use(serveStatic('www'));
app.listen(3000);