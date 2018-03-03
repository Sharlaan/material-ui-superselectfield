const _extends =
  Object.assign ||
  function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i]
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass)
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  })
  if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass) }
}

import React, { Component } from 'react'
import { floatingLabelTypes } from './types'
import { floatingLabelDefaultProps } from './defaultProps'

// TODO: implement style lock when disabled = true

const FloatingLabel = (function (_Component) {
  _inherits(FloatingLabel, _Component)

  function FloatingLabel () {
    let _temp, _this, _ret

    _classCallCheck(this, FloatingLabel)

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _Component.call.apply(_Component, [this].concat(args))
      )),
        _this)),
        (_this.state = { flabelHeight: 0 }),
        _temp)),
      _possibleConstructorReturn(_this, _ret)
    )
  }

  FloatingLabel.prototype.componentDidMount = function componentDidMount () {
    this.setState({ flabelHeight: this.flabel.offsetHeight })
  }

  FloatingLabel.prototype.render = function render () {
    const _this2 = this

    let _props = this.props,
      children = _props.children,
      _props$defaultColors = _props.defaultColors,
      floatingLabelColor = _props$defaultColors.floatingLabelColor,
      focusColor = _props$defaultColors.focusColor,
      floatingLabelFocusStyle = _props.floatingLabelFocusStyle,
      floatingLabelStyle = _props.floatingLabelStyle,
      isFocused = _props.isFocused,
      shrink = _props.shrink

    const defaultStyles = _extends(
      {
        position: 'static',
        top: 0,
        lineHeight: '22px',
        zIndex: 1, // Needed to display label above Chrome's autocomplete field background
        transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
        transform: 'scale(1) translateY(0)',
        transformOrigin: 'left top',
        pointerEvents: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        color: floatingLabelColor,
      },
      floatingLabelStyle
    )

    const focusStyles = isFocused && shrink && _extends({ color: focusColor }, floatingLabelFocusStyle)

    const shrinkStyles = shrink && {
      position: 'absolute',
      transform: 'scale(0.75) translateY(-' + this.state.flabelHeight + 'px)',
      pointerEvents: 'none',
      cursor: 'default',
    }

    return React.createElement(
      'label',
      {
        ref: function ref (_ref) {
          return (_this2.flabel = _ref)
        },
        style: _extends({}, defaultStyles, shrinkStyles, focusStyles),
      },
      children
    )
  }

  return FloatingLabel
})(Component)

FloatingLabel.propTypes = process.env.NODE_ENV !== 'production' ? floatingLabelTypes : {}
FloatingLabel.defaultProps = floatingLabelDefaultProps

export default FloatingLabel
