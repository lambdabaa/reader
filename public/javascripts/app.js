goog.provide('reader.App');

goog.require('goog.dom');



/**
 * @constructor
 */
reader.App = function() {
  var socket = io.connect('http://localhost/');
  socket.on('message', function(msg) {
    console.log(msg);
    var bookmarks = JSON.parse(msg);
    if (bookmarks) {
      $.get('/javascripts/templates/bookmark.html', function(template) {
        // TODO(gareth): Animate fade in
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

  this.shareButton_ = $('#share-button');
  this.shareButton_.click(function() {
    var bookmark = {
        'title': $('#share-title').val(),
        'url': $('#share-url').val(),
        'author': $('#share-author').val()
    };
    
    var json = JSON.stringify(bookmark);
    socket.send(json);
  });
};

goog.addSingletonGetter(reader.App);
