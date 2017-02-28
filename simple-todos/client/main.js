'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _meteorMeteor = require('meteor/meteor');

var _reactDom = require('react-dom');

var _importsUiAppJsx = require('../imports/ui/App.jsx');

var _importsUiAppJsx2 = _interopRequireDefault(_importsUiAppJsx);

_meteorMeteor.Meteor.startup(function () {
  (0, _reactDom.render)(_react2['default'].createElement(_importsUiAppJsx2['default'], null), document.getElementById('render-target'));
});