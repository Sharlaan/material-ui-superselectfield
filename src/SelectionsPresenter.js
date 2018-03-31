import React, { cloneElement } from 'react';
import FloatingLabel from './FloatingLabel';
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import { selectionsPresenterTypes } from './types';
import { selectionsPresenterDefaultProps } from './defaultProps';

const styles = {
  column: { display: 'flex', flexDirection: 'column', flex: 'auto' },
  row: {
    alignItems: 'center',
    display: 'flex',
    flex: 'auto',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  selections: { flex: 1 },
  underline: { position: 'relative', marginTop: 4 },
};

const SelectionsPresenter = ({
  disabled,
  dropDownIcon,
  errorStyle,
  errorText,
  floatingLabel,
  floatingLabelFocusStyle,
  floatingLabelStyle,
  hintText,
  isFocused,
  isOpen,
  muiTheme,
  selectedValues,
  selectionsRenderer,
  underlineErrorStyle,
  underlineFocusStyle,
  underlineStyle,
}) => {
  const { textField: { borderColor, floatingLabelColor, focusColor } } = muiTheme;

  const isValidObject = (obj) =>
    obj &&
    Object.prototype.toString.call(obj) === '[object Object]' &&
    Object.keys(obj).includes('value') &&
    obj.value !== null;

  // Condition for shrinking the floating Label
  const isShrunk =
    !disabled &&
    ((Array.isArray(selectedValues) && (!!selectedValues.length || isFocused)) ||
      (!Array.isArray(selectedValues) && (isValidObject(selectedValues) || (selectedValues === null && isFocused))) ||
      isOpen);

  const baseHRstyle = {
    borderBottom: '1px solid',
    borderColor,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    bottom: 0,
    boxSizing: 'content-box',
    left: 0,
    margin: 0,
    position: 'absolute',
    width: '100%',
    ...underlineStyle,
    ...(errorText ? { borderColor: 'red', ...underlineErrorStyle } : {}),
  };

  const focusedHRstyle = disabled
    ? {}
    : errorText
      ? underlineStyle
      : {
        borderBottom: '2px solid',
        borderColor: isFocused || isOpen ? focusColor : borderColor,
        transform: `scaleX( ${isFocused || isOpen ? 1 : 0} )`,
        transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
        ...underlineFocusStyle,
      };

  const arrowDownIcon = cloneElement(dropDownIcon || <DropDownArrow />, {
    style: {
      // fill: this.context.muiTheme.textField.borderColor,
      transform: `rotate(${isOpen ? 180 : 0}deg)`,
    },
  });

  return (
    <div style={styles.column}>
      <div style={styles.row}>
        <div style={styles.selections}>
          {floatingLabel && (
            <FloatingLabel
              defaultColors={{ floatingLabelColor, focusColor }}
              disabled={disabled}
              floatingLabelFocusStyle={floatingLabelFocusStyle}
              floatingLabelStyle={floatingLabelStyle}
              isFocused={isFocused}
              shrink={isShrunk}
            >
              {floatingLabel}
            </FloatingLabel>
          )}
          {(!floatingLabel || isShrunk) && selectionsRenderer(selectedValues, hintText)}
        </div>
        {arrowDownIcon}
      </div>
      <div style={styles.underline}>
        <hr style={baseHRstyle} />
        <hr style={{ ...baseHRstyle, ...focusedHRstyle }} />
      </div>
      {errorText && <div style={{ marginTop: 5, color: 'red', fontSize: 12, ...errorStyle }}>{errorText}</div>}
    </div>
  );
};

SelectionsPresenter.propTypes = selectionsPresenterTypes;
SelectionsPresenter.defaultProps = selectionsPresenterDefaultProps;

export default SelectionsPresenter;
