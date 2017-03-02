'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _meteorReactMeteorData = require('meteor/react-meteor-data');

var _apiTasks = require('../api/tasks');

var _TaskJsx = require('./Task.jsx');

var _TaskJsx2 = _interopRequireDefault(_TaskJsx);

var App = (function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);

    this.state = {
      hideCompleted: false
    };
  }

  _createClass(App, [{
    key: 'toggleHideCompleted',
    value: function toggleHideCompleted() {
      this.setState({
        hideCompleted: !this.state.hideCompleted
      });
    }
  }, {
    key: 'renderTasks',
    value: function renderTasks() {
      var filteredTasks = this.props.tasks;
      if (this.state.hideCompleted) {
        filteredTasks = filteredTasks.filter(function (task) {
          return !task.checked;
        });
      }
      return filteredTasks.map(function (task) {
        return _react2['default'].createElement(_TaskJsx2['default'], { key: task._id, task: task });
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();

      var text = _reactDom2['default'].findDOMNode(this.refs.textInput).value.trim();

      _apiTasks.Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      _reactDom2['default'].findDOMNode(this.refs.textInput).value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'header',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            'Todo List ',
            this.props.incompleteTaskCount
          ),
          _react2['default'].createElement(
            'label',
            { className: 'hide-completed' },
            _react2['default'].createElement('input', {
              type: 'checkbox',
              readOnly: true,
              checked: this.state.hideCompleted,
              onClick: this.toggleHideCompleted.bind(this)
            }),
            'Hide Completed Tasks'
          ),
          _react2['default'].createElement(
            'form',
            { className: 'new-task', onSubmit: this.handleSubmit.bind(this) },
            _react2['default'].createElement('input', {
              type: 'text',
              ref: 'textInput',
              placeholder: 'Type to add new tasks'
            })
          ),
          _react2['default'].createElement(
            'ul',
            null,
            this.renderTasks()
          )
        )
      );
    }
  }]);

  return App;
})(_react.Component);

App.propTypes = {
  tasks: _react.PropTypes.array.isRequired
};

exports['default'] = (0, _meteorReactMeteorData.createContainer)(function () {
  return {
    tasks: _apiTasks.Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteTaskCount: _apiTasks.Tasks.find({ checked: { $ne: true } }).count()
  };
}, App);
module.exports = exports['default'];