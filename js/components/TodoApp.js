/**
 * This component operates as a 'Controller-View'. It listens for changes
 * in the TodoStore and passes the new data to its children
 */

var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current Todo data from TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll()
  };
}

var TodoApp = React.createClass({
  getInitialState: function () {
    return getTodoState();
  },

  componentDidMount: function () {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          />
        <Footer allTodos={this.state.allTodos}/>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;