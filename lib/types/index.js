'use strict';

exports.__esModule = true;
exports.selectFieldTypes = exports.selectionsPresenterTypes = exports.floatingLabelTypes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _propTypes = require('prop-types');

var _utils = require('../utils');

var floatingLabelTypes = exports.floatingLabelTypes = {
  shrink: _propTypes.bool
};

var selectionsPresenterTypes = exports.selectionsPresenterTypes = {
  selectionsRenderer: _propTypes.func,
  hintText: _propTypes.string,
  errorText: _propTypes.string,
  errorStyle: _propTypes.object,
  underlineErrorStyle: _propTypes.object
};

var selectFieldTypes = exports.selectFieldTypes = {
  anchorOrigin: (0, _propTypes.shape)({
    vertical: (0, _propTypes.oneOf)(['top', 'bottom']),
    horizontal: (0, _propTypes.oneOf)(['left', 'right'])
  }),
  style: _propTypes.object,
  menuStyle: _propTypes.object,
  menuGroupStyle: _propTypes.object,
  checkPosition: (0, _propTypes.oneOf)(['', 'left', 'right']),
  checkedIcon: _propTypes.node,
  unCheckedIcon: _propTypes.node,
  dropDownIcon: _propTypes.node,
  hoverColor: _propTypes.string,
  // children can be either:
  // an html element with a required 'value' property, and optional label prop,
  // an optgroup with valid children (same as bove case),
  // an array of either valid chidlren, or of optgroups hosting valid children
  children: (0, _propTypes.oneOfType)([(0, _propTypes.shape)({
    value: _propTypes.any.isRequired,
    label: _propTypes.string
  }), function (props, propName, componentName, location, propFullName) {
    var pp = props[propName];
    if (pp.type === 'optgroup' && pp.props.children) {
      if (Array.isArray(pp.props.children)) {
        for (var _iterator = pp.props.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var child = _ref;

          if (!child.props.value) {
            return new Error('\n              Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + ' ' + props.name + '\'.\n              Validation failed.');
          }
        }
      } else if (_typeof(pp.props.children) === 'object' && !pp.props.children.props.value) {
        return new Error('\n          Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + ' ' + props.name + '\'.\n          Validation failed.');
      }
    }
  }, (0, _propTypes.arrayOf)(function (props, propName, componentName, location, propFullName) {
    if (props[propName].type !== 'optgroup') {
      if (!props[propName].props.value) {
        return new Error('\n          Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + ' ' + props.name + '\'.\n          Validation failed.');
      }
    } else {
      for (var _iterator2 = props[propName].props.children, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var child = _ref2;

        if (!child.props.value) {
          return new Error('\n            Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + ' ' + props.name + '\'.\n            Validation failed.');
        }
      }
    }
  })]),
  innerDivStyle: _propTypes.object,
  selectedMenuItemStyle: _propTypes.object,
  menuFooterStyle: _propTypes.object,
  name: _propTypes.string,
  floatingLabel: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.node]),
  floatingLabelFocusStyle: _propTypes.object,
  underlineStyle: _propTypes.object,
  underlineFocusStyle: _propTypes.object,
  autocompleteUnderlineStyle: _propTypes.object,
  autocompleteUnderlineFocusStyle: _propTypes.object,
  hintText: _propTypes.string,
  hintTextAutocomplete: _propTypes.string,
  noMatchFound: _propTypes.string,
  noMatchFoundStyle: _propTypes.object,
  showAutocompleteThreshold: (0, _propTypes.oneOfType)([_propTypes.number, (0, _propTypes.oneOf)(['always', 'never'])]),
  elementHeight: (0, _propTypes.oneOfType)([_propTypes.number, (0, _propTypes.arrayOf)(_propTypes.number)]),
  nb2show: _propTypes.number,
  /*  value: oneOfType([
    shape({
      value: any.isRequired,
      label: string
    },
    arrayOf(shape({
      value: any.isRequired,
      label: string
    })
  ]), */
  value: function value(props, propName, componentName, location, propFullName) {
    var multiple = props.multiple,
        value = props.value;

    if (multiple) {
      var index = (0, _utils.checkFormat)(value);
      if (!Array.isArray(value)) {
        return new Error('\n          When using \'multiple\' mode, \'value\' of \'' + componentName + ' ' + props.name + '\' must be an array.\n          Validation failed.');
      } else if (index !== -1) {
        return new Error('\n          \'value[' + index + ']\' of \'' + componentName + ' ' + props.name + '\' must be an object including a \'value\' property.\n          Validation failed.');
      }
    } else if (value !== null && ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !('value' in value))) {
      return new Error('\n        \'value\' of \'' + componentName + ' ' + props.name + '\' must be an object including a \'value\' property.\n        Validation failed.');
    }
  },
  autocompleteFilter: _propTypes.func,
  selectionsRenderer: _propTypes.func,
  menuCloseButton: _propTypes.node,
  canAutoPosition: _propTypes.bool,
  multiple: _propTypes.bool,
  openImmediately: _propTypes.bool,
  keepSearchOnSelect: _propTypes.bool,
  disabled: _propTypes.bool,
  onChange: _propTypes.func,
  onSelect: _propTypes.func,
  onMenuOpen: _propTypes.func,
  onAutoCompleteTyping: _propTypes.func
};