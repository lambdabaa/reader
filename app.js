/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , io = require('socket.io')
  , path = require('path')
  , routes = require('./routes');

var app = express();
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

io.listen(server).sockets.on('connection', function(socket) {
  console.log('Client ' + socket + ' connected!');
  
  // Send the base bookmarks over
  // TODO(gareth): These are just stubs
  var bookmark1 = {
      'title': 'The Google Website',
      'url': 'http://www.google.com',
      'author': 'Sergey Brin',
      'created': 344209598,
      'updated': 1344209598,
      'comments': [
          {
              'body': 'The comment body',
              'author': 'Gareth Aye'
          },
          {
              'body': 'Yeah. LOLZOR.',
              'author': 'Alison Holley'
          }
      ]
  };
  
  var bookmark2 = {
      'title': 'Yahoo is a Company Run by Premium Execs',
      'url': 'http://www.yahoo.com',
      'author': 'Marissa Mayer',
      'created': 1344209599,
      'updated': 1344209599,
      'comments': [
          {
              'body': 'The comment body',
              'author': 'Gareth Aye'
          },
          {
              'body': 'Yeah. LOLZOR.',
              'author': 'Alison Holley'
          }
      ]
  };
  
  socket.send(JSON.stringify([bookmark1, bookmark2]));
});
