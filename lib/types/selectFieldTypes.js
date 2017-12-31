'use strict'

exports.__esModule = true
exports.selectFieldTypes = undefined

const _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
      return typeof obj
    }
    : function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }

const _propTypes = require('prop-types')

const _utils = require('../utils')

const selectFieldTypes = (exports.selectFieldTypes = {
  anchorOrigin: (0, _propTypes.shape)({
    vertical: (0, _propTypes.oneOf)(['top', 'bottom']),
    horizontal: (0, _propTypes.oneOf)(['left', 'right']),
  }),
  autocompleteFilter: _propTypes.func,
  autocompleteStyle: _propTypes.object,
  autocompleteUnderlineFocusStyle: _propTypes.object,
  autocompleteUnderlineStyle: _propTypes.object,
  canAutoPosition: _propTypes.bool,
  checkPosition: (0, _propTypes.oneOf)(['', 'left', 'right']),
  checkedIcon: _propTypes.node,
  // children can be either:
  // an html element with a required 'value' property, and optional label prop,
  // an optgroup with valid children (same as bove case),
  // an array of either valid chidlren, or of optgroups hosting valid children
  children: (0, _propTypes.oneOfType)([
    (0, _propTypes.shape)({
      value: _propTypes.any.isRequired,
      label: _propTypes.string,
    }),
    function (props, propName, componentName, location, propFullName) {
      const pp = props[propName]
      if (pp.type === 'optgroup' && pp.props.children) {
        if (Array.isArray(pp.props.children)) {
          for (
            var _iterator = pp.props.children,
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
            ;

          ) {
            var _ref

            if (_isArray) {
              if (_i >= _iterator.length) break
              _ref = _iterator[_i++]
            } else {
              _i = _iterator.next()
              if (_i.done) break
              _ref = _i.value
            }

            const child = _ref

            if (!child.props.value) {
              return new Error(
                "\n              Missing required property 'value' for '" +
                  propFullName +
                  "' supplied to '" +
                  componentName +
                  ' ' +
                  props.name +
                  "'.\n              Validation failed."
              )
            }
          }
        } else if (_typeof(pp.props.children) === 'object' && !pp.props.children.props.value) {
          return new Error(
            "\n          Missing required property 'value' for '" +
              propFullName +
              "' supplied to '" +
              componentName +
              ' ' +
              props.name +
              "'.\n          Validation failed."
          )
        }
      }
    },
    (0, _propTypes.arrayOf)(function (props, propName, componentName, location, propFullName) {
      if (props[propName].type !== 'optgroup') {
        if (!props[propName].props.value) {
          return new Error(
            "\n          Missing required property 'value' for '" +
              propFullName +
              "' supplied to '" +
              componentName +
              ' ' +
              props.name +
              "'.\n          Validation failed."
          )
        }
      } else {
        for (
          var _iterator2 = props[propName].props.children,
            _isArray2 = Array.isArray(_iterator2),
            _i2 = 0,
            _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
          ;

        ) {
          var _ref2

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break
            _ref2 = _iterator2[_i2++]
          } else {
            _i2 = _iterator2.next()
            if (_i2.done) break
            _ref2 = _i2.value
          }

          const child = _ref2

          if (!child.props.value) {
            return new Error(
              "\n            Missing required property 'value' for '" +
                propFullName +
                "' supplied to '" +
                componentName +
                ' ' +
                props.name +
                "'.\n            Validation failed."
            )
          }
        }
      }
    }),
  ]),
  disabled: _propTypes.bool,
  elementHeight: (0, _propTypes.oneOfType)([_propTypes.number, (0, _propTypes.arrayOf)(_propTypes.number)]),
  floatingLabel: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.node]),
  floatingLabelFocusStyle: _propTypes.object,
  hintText: _propTypes.string,
  hintTextAutocomplete: _propTypes.string,
  hoverColor: _propTypes.string,
  innerDivStyle: _propTypes.object,
  keepSearchOnSelect: _propTypes.bool,
  menuCloseButton: _propTypes.node,
  menuFooterStyle: _propTypes.object,
  menuGroupStyle: _propTypes.object,
  menuStyle: _propTypes.object,
  multiple: _propTypes.bool,
  name: _propTypes.string,
  nb2show: _propTypes.number,
  noMatchFound: _propTypes.string,
  noMatchFoundStyle: _propTypes.object,
  onAutoCompleteTyping: _propTypes.func,
  onChange: _propTypes.func,
  onMenuOpen: _propTypes.func,
  onSelect: _propTypes.func,
  openImmediately: _propTypes.bool,
  selectedMenuItemStyle: _propTypes.object,
  selectionsRenderer: _propTypes.func,
  showAutocompleteThreshold: (0, _propTypes.oneOfType)([_propTypes.number, (0, _propTypes.oneOf)(['always', 'never'])]),
  style: _propTypes.object,
  unCheckedIcon: _propTypes.node,
  underlineFocusStyle: _propTypes.object,
  underlineStyle: _propTypes.object,
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
  value: function value (props, propName, componentName, location, propFullName) {
    let multiple = props.multiple,
      value = props.value

    if (multiple) {
      const index = (0, _utils.checkFormat)(value)
      if (!Array.isArray(value)) {
        return new Error(
          "\n          When using 'multiple' mode, 'value' of '" +
            componentName +
            ' ' +
            props.name +
            "' must be an array.\n          Validation failed."
        )
      } else if (index !== -1) {
        return new Error(
          "\n          'value[" +
            index +
            "]' of '" +
            componentName +
            ' ' +
            props.name +
            "' must be an object including a 'value' property.\n          Validation failed."
        )
      }
    } else if (
      value !== null &&
      ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !('value' in value))
    ) {
      return new Error(
        "\n        'value' of '" +
          componentName +
          ' ' +
          props.name +
          "' must be an object including a 'value' property.\n        Validation failed."
      )
    }
  },
})
