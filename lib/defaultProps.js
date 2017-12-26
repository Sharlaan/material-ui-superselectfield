'use strict';

exports.__esModule = true;
exports.selectFieldDefaultProps = exports.selectionsPresenterDefaultProps = exports.floatingLabelDefaultProps = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _check = require('material-ui/svg-icons/navigation/check');

var _check2 = _interopRequireDefault(_check);

var _checkBoxOutlineBlank = require('material-ui/svg-icons/toggle/check-box-outline-blank');

var _checkBoxOutlineBlank2 = _interopRequireDefault(_checkBoxOutlineBlank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floatingLabelDefaultProps = exports.floatingLabelDefaultProps = {
  shrink: false
};

var selectionsPresenterDefaultProps = exports.selectionsPresenterDefaultProps = {
  hintText: 'Click me',
  errorText: '',
  errorStyle: {},
  underlineErrorStyle: {},
  selectionsRenderer: function selectionsRenderer(values, hintText) {
    if (!values) return hintText;
    var value = values.value,
        label = values.label;

    if (Array.isArray(values)) {
      return values.length ? values.map(function (_ref) {
        var value = _ref.value,
            label = _ref.label;
        return label || value;
      }).join(', ') : hintText;
    } else if (label || value) return label || value;else return hintText;
  }
};

var selectFieldDefaultProps = exports.selectFieldDefaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  checkPosition: '',
  checkedIcon: _react2.default.createElement(_check2.default, { style: { top: 'calc(50% - 12px)' } }),
  unCheckedIcon: _react2.default.createElement(_checkBoxOutlineBlank2.default, { style: { top: 'calc(50% - 12px)' } }),
  menuCloseButton: null,
  canAutoPosition: true,
  multiple: false,
  openImmediately: false,
  keepSearchOnSelect: false,
  disabled: false,
  nb2show: 5,
  hintTextAutocomplete: 'Type something',
  noMatchFound: 'No match found',
  noMatchFoundStyle: {},
  showAutocompleteThreshold: 10,
  elementHeight: 36,
  autocompleteFilter: function autocompleteFilter(searchText, text) {
    if (!text || typeof text !== 'string' && typeof text !== 'number') return false;
    if (typeof searchText !== 'string' && typeof searchText !== 'number') return false;
    return (text + '').toLowerCase().includes(searchText.toLowerCase());
  },
  value: null,
  onChange: function onChange() {},
  onSelect: function onSelect() {},
  onMenuOpen: function onMenuOpen() {},
  onAutoCompleteTyping: function onAutoCompleteTyping() {},
  children: []
};