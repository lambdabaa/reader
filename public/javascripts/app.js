goog.provide('reader.App');

/**
 * @constructor
 */
reader.App = function() {
  var socket = io.connect('http://localhost/');
  socket.on('connect', function() {
    console.log('Connected to socket.io server!');
  });
  socket.on('message', function(msg) {
    console.log('Received message from socket.io server:');
    console.log(msg);
  });
  
  /**
   * socket.io connection to web server
   * @type {string}
   * @private
   */
   this.socket_ = socket;
};

goog.addSingletonGetter(reader.App);
