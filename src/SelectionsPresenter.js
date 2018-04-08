import React, { cloneElement } from 'react';
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';

import FloatingLabel from './FloatingLabel';
import UnderLine from './UnderLine';
import { selectionsPresenterTypes } from './types';
import { selectionsPresenterDefaultProps } from './defaultProps';

const styles = {
  column: { display: 'flex', flexDirection: 'column', flex: 'auto' },
  error: { marginTop: 5, color: 'red', fontSize: 12 },
  row: {
    alignItems: 'center',
    display: 'flex',
    flex: 'auto',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  selections: { flex: 1 },
};

SelectionsPresenter.propTypes = selectionsPresenterTypes;
SelectionsPresenter.defaultProps = selectionsPresenterDefaultProps;

export default function SelectionsPresenter ({
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
}) {
  const { textField: { borderColor, floatingLabelColor, focusColor } } = muiTheme;

  const isValidObject = (obj) =>
    obj &&
    Object.prototype.toString.call(obj) === '[object Object]' &&
    Object.keys(obj).includes('value') &&
    obj.value !== null;

  // Condition for shrinking the floating Label
  const isShrunk =
    (Array.isArray(selectedValues) && (!!selectedValues.length || isFocused)) ||
    (!Array.isArray(selectedValues) && (isValidObject(selectedValues) || (selectedValues === null && isFocused))) ||
    isOpen;

  const ArrowDownIcon = () =>
    cloneElement(dropDownIcon || <DropDownArrow />, {
      style: {
        // fill: this.context.muiTheme.textField.borderColor,
        transform: `rotate(${isOpen ? 180 : 0}deg)`,
      },
    });

  const Error = () => <div style={{ ...styles.error, ...errorStyle }}>{errorText}</div>;

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
        <ArrowDownIcon />
      </div>

      <UnderLine
        disabled={disabled}
        errorText={errorText}
        isFocused={isFocused}
        isOpen={isOpen}
        themeBorderColor={borderColor}
        themeFocusColor={focusColor}
        underlineErrorStyle={underlineErrorStyle}
        underlineFocusStyle={underlineFocusStyle}
        underlineStyle={underlineStyle}
      />

      {errorText && <Error />}
    </div>
  );
}
