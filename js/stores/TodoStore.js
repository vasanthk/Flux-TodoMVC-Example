/**
 * Todo Store
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {}; // Collection of todo items
// Because this variable lives outside the class, but within the closure of the module,
// it remains private — it cannot be directly changed from outside of the module.
// This helps us preserve a distinct input/output interface for the flow of data by
// making it impossible to update the store without using an action.

/**
 * Create a Todo item.
 */
function create(text) {
  // Using the current timestamp in place of a real id.
  var id = Date.now();
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Delete a Todo item.
 */
function destroy(id) {
  delete _todos[id];
}

var TodoStore = assign({}, EventEmitter.prototype, {
  // Get the entire collection of Todo's
  getAll: function () {
    return _todos;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.actionType;
    var text = payload.text.trim();

    switch (action.actionType) {
      case TodoConstants.TODO_CREATE:
        if (text !== '') {
          create(text);
          TodoStore.emitChange();
        }
        break;

      case TodoConstants.TODO_DESTROY:
        destroy(action.id);
        TodoStore.emitChange();
        break;
    }
    return true;
  })

});

module.exports = TodoStore;

