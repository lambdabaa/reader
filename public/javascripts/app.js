goog.provide('reader.App');

goog.require('goog.dom');



/**
 * @constructor
 */
reader.App = function() {
  var socket = io.connect('http://localhost/');
  socket.on('message', function(msg) {
    var bookmarks = JSON.parse(msg);
    if (bookmarks) {
      $.get('/javascripts/templates/bookmark.html', function(template) {
        $.tmpl(template, bookmarks).appendTo('#bookmarks');
      });
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
