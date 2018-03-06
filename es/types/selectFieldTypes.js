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

import { shape, arrayOf, func, oneOf, oneOfType, any, node, object, string, number, bool } from 'prop-types'
import { checkFormat } from '../utils'

export var selectFieldTypes = {
  anchorOrigin: shape({
    vertical: oneOf(['top', 'bottom']),
    horizontal: oneOf(['left', 'right']),
  }),
  autocompleteFilter: func,
  autocompleteStyle: object,
  autocompleteUnderlineFocusStyle: object,
  autocompleteUnderlineStyle: object,
  canAutoPosition: bool,
  checkPosition: oneOf(['', 'left', 'right']),
  checkedIcon: node,
  // children can be either:
  // an html element with a required 'value' property, and optional label prop,
  // an optgroup with valid children (same as bove case),
  // an array of either valid chidlren, or of optgroups hosting valid children
  children: oneOfType([
    shape({
      value: any.isRequired,
      label: string,
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
    arrayOf(function (props, propName, componentName, location, propFullName) {
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
  disabled: bool,
  elementHeight: oneOfType([number, arrayOf(number)]),
  floatingLabel: oneOfType([string, node]),
  hintText: string,
  hintTextAutocomplete: string,
  hoverColor: string,
  innerDivStyle: object,
  keepSearchOnSelect: bool,
  menuCloseButton: node,
  menuFooterStyle: object,
  menuGroupStyle: object,
  menuStyle: object,
  multiple: bool,
  name: string,
  nb2show: number,
  noMatchFound: string,
  noMatchFoundStyle: object,
  onAutoCompleteTyping: func,
  onChange: func,
  onMenuOpen: func,
  onSelect: func,
  openImmediately: bool,
  selectedMenuItemStyle: object,
  selectionsRenderer: func,
  showAutocompleteThreshold: oneOfType([number, oneOf(['always', 'never'])]),
  style: object,
  unCheckedIcon: node,
  underlineFocusStyle: object,
  underlineStyle: object,
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
      const index = checkFormat(value)
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
}
