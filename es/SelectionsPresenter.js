var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import FloatingLabel from './FloatingLabel';
import PropTypes from 'prop-types';
import React from 'react';
import { objectShape } from './utils';

// noinspection JSDuplicatedDeclaration
var styles = {
  column: { display: 'flex', flexDirection: 'column' },
  row: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  selections: { flex: 1 },
  underline: { position: 'relative', marginTop: 4 }
};

var SelectionsPresenter = function SelectionsPresenter(_ref) {
  var selectedValues = _ref.selectedValues,
      selectionsRenderer = _ref.selectionsRenderer,
      floatingLabel = _ref.floatingLabel,
      hintText = _ref.hintText,
      muiTheme = _ref.muiTheme,
      floatingLabelStyle = _ref.floatingLabelStyle,
      floatingLabelFocusStyle = _ref.floatingLabelFocusStyle,
      underlineStyle = _ref.underlineStyle,
      underlineFocusStyle = _ref.underlineFocusStyle,
      isFocused = _ref.isFocused,
      isOpen = _ref.isOpen,
      disabled = _ref.disabled,
      errorText = _ref.errorText,
      errorStyle = _ref.errorStyle,
      underlineErrorStyle = _ref.underlineErrorStyle;
  var _muiTheme$textField = muiTheme.textField,
      floatingLabelColor = _muiTheme$textField.floatingLabelColor,
      borderColor = _muiTheme$textField.borderColor,
      focusColor = _muiTheme$textField.focusColor;


  var isValidObject = function isValidObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).includes('value');
  };
  // Condition for shrinking the floating Label
  var isShrunk = Array.isArray(selectedValues) && !!selectedValues.length || !Array.isArray(selectedValues) && isValidObject(selectedValues) || isOpen;

  var baseHRstyle = _extends({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    margin: 0,
    boxSizing: 'content-box',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid',
    borderColor: borderColor
  }, underlineStyle, errorText ? _extends({ borderColor: 'red' }, underlineErrorStyle) : {});

  var focusedHRstyle = disabled ? {} : errorText ? underlineStyle : _extends({
    borderBottom: '2px solid',
    borderColor: isFocused || isOpen ? focusColor : borderColor,
    transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
    transform: 'scaleX( ' + (isFocused || isOpen ? 1 : 0) + ' )'
  }, underlineFocusStyle);

  return React.createElement(
    'div',
    { style: styles.column },
    React.createElement(
      'div',
      { style: styles.row },
      React.createElement(
        'div',
        { style: styles.selections },
        floatingLabel && React.createElement(
          FloatingLabel,
          {
            shrink: isShrunk,
            isFocused: isFocused,
            disabled: disabled,
            defaultColors: { floatingLabelColor: floatingLabelColor, focusColor: focusColor },
            floatingLabelStyle: floatingLabelStyle,
            floatingLabelFocusStyle: floatingLabelFocusStyle
          },
          floatingLabel
        ),
        (!floatingLabel || isShrunk) && selectionsRenderer(selectedValues, hintText)
      ),
      React.createElement(DropDownArrow, { style: { fill: borderColor } })
    ),
    React.createElement(
      'div',
      { style: styles.underline },
      React.createElement('hr', { style: baseHRstyle }),
      React.createElement('hr', { style: _extends({}, baseHRstyle, focusedHRstyle) })
    ),
    errorText && React.createElement(
      'div',
      { style: _extends({ marginTop: 5, color: 'red', fontSize: 12 }, errorStyle) },
      errorText
    )
  );
};

SelectionsPresenter.propTypes = process.env.NODE_ENV !== "production" ? {
  value: PropTypes.oneOfType([objectShape, PropTypes.arrayOf(objectShape)]),
  selectionsRenderer: PropTypes.func,
  hintText: PropTypes.string,
  errorText: PropTypes.string,
  errorStyle: PropTypes.object,
  underlineErrorStyle: PropTypes.object
} : {};

SelectionsPresenter.defaultProps = {
  hintText: 'Click me',
  errorText: '',
  errorStyle: {},
  underlineErrorStyle: {},
  value: null,
  selectionsRenderer: function selectionsRenderer(values, hintText) {
    if (!values) return hintText;
    var value = values.value,
        label = values.label;

    if (Array.isArray(values)) {
      return values.length ? values.map(function (_ref2) {
        var value = _ref2.value,
            label = _ref2.label;
        return label || value;
      }).join(', ') : hintText;
    } else if (label || value) return label || value;else return hintText;
  }
};

export default SelectionsPresenter;