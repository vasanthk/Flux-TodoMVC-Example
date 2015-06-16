/*
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 *
 * @url: https://github.com/facebook/flux/blob/master/src/Dispatcher.js
 */

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();