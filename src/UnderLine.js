import React from 'react';

import { underLineTypes } from './types';

const styles = {
  hr: {
    borderBottom: '1px solid',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    bottom: 0,
    boxSizing: 'content-box',
    left: 0,
    margin: 0,
    position: 'absolute',
    width: '100%',
  },
  underline: { position: 'relative', marginTop: 4 },
};

UnderLine.propTypes = underLineTypes;

export default function UnderLine ({
  disabled,
  errorText,
  isFocused,
  isOpen,
  themeBorderColor,
  themeFocusColor,
  underlineErrorStyle,
  underlineFocusStyle,
  underlineStyle,
}) {
  const baseHRstyle = {
    ...styles.hr,
    borderColor: themeBorderColor,
    ...underlineStyle,
    ...(errorText ? { borderColor: 'red', ...underlineErrorStyle } : {}),
  };

  const focusedHRstyle = errorText
    ? underlineStyle
    : {
      borderBottom: '2px solid',
      borderColor: (isFocused && !disabled) || isOpen ? themeFocusColor : themeBorderColor,
      transform: `scaleX( ${(isFocused && !disabled) || isOpen ? 1 : 0} )`,
      transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
      ...underlineFocusStyle,
    };

  return (
    <div style={styles.underline}>
      <hr style={baseHRstyle} />
      <hr style={{ ...baseHRstyle, ...focusedHRstyle }} />
    </div>
  );
}
