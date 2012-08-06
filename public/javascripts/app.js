goog.provide('reader.App');

goog.require('goog.dom');

/**
 * @constructor
 */
reader.App = function() {
  var socket = io.connect('http://localhost/');
  socket.on('connect', function() {
    console.log('Connected to socket.io server!');
  });
  
  socket.on('message', function(msg) {
    var bookmarks = JSON.parse(msg);
    for (key in bookmarks) {
      var bookmark = bookmarks[key];
      console.log(bookmark);
      // TODO(gareth): Why doesn't this work?
      $("#bookmark-template").tmpl(bookmark).appendTo("#bookmarks");
    }
  });
  
  /**
   * socket.io connection to web server
   * @type {string}
   * @private
   */
   this.socket_ = socket;
};

goog.addSingletonGetter(reader.App);
