'use strict'

exports.__esModule = true

const _propTypes = require('prop-types')

exports.default = {
  defaultColors: (0, _propTypes.shape)({ floatingLabelColor: _propTypes.string, focusColor: _propTypes.string }),
  floatingLabelFocusStyle: _propTypes.object,
  floatingLabelStyle: _propTypes.object,
  isFocused: _propTypes.bool,
  shrink: _propTypes.bool,
}
module.exports = exports['default']
