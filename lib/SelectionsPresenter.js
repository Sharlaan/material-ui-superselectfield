'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FloatingLabel = require('./FloatingLabel');

var _FloatingLabel2 = _interopRequireDefault(_FloatingLabel);

var _arrowDropDown = require('material-ui/svg-icons/navigation/arrow-drop-down');

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

var _types = require('./types');

var _defaultProps = require('./defaultProps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  column: { display: 'flex', flexDirection: 'column', flex: 'auto' },
  row: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 'auto'
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
      underlineErrorStyle = _ref.underlineErrorStyle,
      dropDownIcon = _ref.dropDownIcon;
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

  var arrowDownIcon = (0, _react.cloneElement)(dropDownIcon || _react2.default.createElement(_arrowDropDown2.default, null), {
    style: {
      // fill: this.context.muiTheme.textField.borderColor,
      transform: 'rotate(' + (isOpen ? 180 : 0) + 'deg)'
    }
  });

  return _react2.default.createElement(
    'div',
    { style: styles.column },
    _react2.default.createElement(
      'div',
      { style: styles.row },
      _react2.default.createElement(
        'div',
        { style: styles.selections },
        floatingLabel && _react2.default.createElement(
          _FloatingLabel2.default,
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
      arrowDownIcon
    ),
    _react2.default.createElement(
      'div',
      { style: styles.underline },
      _react2.default.createElement('hr', { style: baseHRstyle }),
      _react2.default.createElement('hr', { style: _extends({}, baseHRstyle, focusedHRstyle) })
    ),
    errorText && _react2.default.createElement(
      'div',
      { style: _extends({ marginTop: 5, color: 'red', fontSize: 12 }, errorStyle) },
      errorText
    )
  );
};

SelectionsPresenter.propTypes = process.env.NODE_ENV !== "production" ? _types.selectionsPresenterTypes : {};
SelectionsPresenter.defaultProps = _defaultProps.selectionsPresenterDefaultProps;

exports.default = SelectionsPresenter;
module.exports = exports['default'];