import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import FloatingLabel from './FloatingLabel';
import PropTypes from 'prop-types';
import React from 'react';
import { objectShape } from './utils';

// noinspection JSDuplicatedDeclaration
const styles = {
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

const SelectionsPresenter = ({
  selectedValues,
  selectionsRenderer,
  floatingLabel,
  hintText,
  muiTheme,
  floatingLabelStyle,
  floatingLabelFocusStyle,
  underlineStyle,
  underlineFocusStyle,
  isFocused,
  isOpen,
  disabled,
  errorText,
  errorStyle,
  underlineErrorStyle
}) => {
  const { textField: { floatingLabelColor, borderColor, focusColor } } = muiTheme;

  const isValidObject = obj =>
    Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).includes('value');
  // Condition for shrinking the floating Label
  const isShrunk =
    (Array.isArray(selectedValues) && !!selectedValues.length) ||
    (!Array.isArray(selectedValues) && isValidObject(selectedValues)) ||
    isOpen;

  const baseHRstyle = {
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
    borderColor,
    ...underlineStyle,
    ...(errorText ? { borderColor: 'red', ...underlineErrorStyle } : {})
  };

  const focusedHRstyle = disabled
    ? {}
    : errorText
      ? underlineStyle
      : {
          borderBottom: '2px solid',
          borderColor: isFocused || isOpen ? focusColor : borderColor,
          transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
          transform: `scaleX( ${isFocused || isOpen ? 1 : 0} )`,
          ...underlineFocusStyle
        };

  return (
    <div style={styles.column}>
      <div style={styles.row}>
        <div style={styles.selections}>
          {floatingLabel && (
            <FloatingLabel
              shrink={isShrunk}
              isFocused={isFocused}
              disabled={disabled}
              defaultColors={{ floatingLabelColor, focusColor }}
              floatingLabelStyle={floatingLabelStyle}
              floatingLabelFocusStyle={floatingLabelFocusStyle}
            >
              {floatingLabel}
            </FloatingLabel>
          )}
          {(!floatingLabel || isShrunk) && selectionsRenderer(selectedValues, hintText)}
        </div>
        <DropDownArrow style={{ fill: borderColor }} />
      </div>
      <div style={styles.underline}>
        <hr style={baseHRstyle} />
        <hr style={{ ...baseHRstyle, ...focusedHRstyle }} />
      </div>
      {errorText && (
        <div style={{ marginTop: 5, color: 'red', fontSize: 12, ...errorStyle }}>{errorText}</div>
      )}
    </div>
  );
};

SelectionsPresenter.propTypes = {
  value: PropTypes.oneOfType([objectShape, PropTypes.arrayOf(objectShape)]),
  selectionsRenderer: PropTypes.func,
  hintText: PropTypes.string,
  errorText: PropTypes.string,
  errorStyle: PropTypes.object,
  underlineErrorStyle: PropTypes.object
};

SelectionsPresenter.defaultProps = {
  hintText: 'Click me',
  errorText: '',
  errorStyle: {},
  underlineErrorStyle: {},
  value: null,
  selectionsRenderer: (values, hintText) => {
    if (!values) return hintText;
    const { value, label } = values;
    if (Array.isArray(values)) {
      return values.length ? values.map(({ value, label }) => label || value).join(', ') : hintText;
    } else if (label || value) return label || value;
    else return hintText;
  }
};

export default SelectionsPresenter;
