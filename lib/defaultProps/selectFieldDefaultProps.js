'use strict'

exports.__esModule = true

const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _check = require('material-ui/svg-icons/navigation/check')

const _check2 = _interopRequireDefault(_check)

const _checkBoxOutlineBlank = require('material-ui/svg-icons/toggle/check-box-outline-blank')

const _checkBoxOutlineBlank2 = _interopRequireDefault(_checkBoxOutlineBlank)

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

exports.default = {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  autocompleteFilter: function autocompleteFilter (searchText, text) {
    if (!text || (typeof text !== 'string' && typeof text !== 'number')) return false
    if (typeof searchText !== 'string' && typeof searchText !== 'number') return false
    return (text + '').toLowerCase().includes(searchText.toLowerCase())
  },
  autocompleteStyle: {},
  canAutoPosition: true,
  checkPosition: '',
  checkedIcon: _react2.default.createElement(_check2.default, { style: { top: 'calc(50% - 12px)' } }),
  children: [],
  disabled: false,
  elementHeight: 36,
  hintTextAutocomplete: 'Type something',
  keepSearchOnSelect: false,
  menuCloseButton: null,
  multiple: false,
  nb2show: 5,
  noMatchFound: 'No match found',
  noMatchFoundStyle: {},
  onAutoCompleteTyping: function onAutoCompleteTyping () {},
  onChange: function onChange () {},
  onMenuOpen: function onMenuOpen () {},
  onSelect: function onSelect () {},
  openImmediately: false,
  showAutocompleteThreshold: 10,
  unCheckedIcon: _react2.default.createElement(_checkBoxOutlineBlank2.default, { style: { top: 'calc(50% - 12px)' } }),
  value: null,
}
module.exports = exports['default']
