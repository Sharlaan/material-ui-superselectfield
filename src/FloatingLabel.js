import React, { Component } from 'react';
import { floatingLabelTypes } from './types';
import { floatingLabelDefaultProps } from './defaultProps';

class FloatingLabel extends Component {
  state = { flabelHeight: 0 };

  componentDidMount () {
    this.setState({ flabelHeight: this.flabel.offsetHeight });
  }

  render () {
    const {
      children,
      defaultColors: { floatingLabelColor, focusColor },
      /* disabled, */
      floatingLabelFocusStyle,
      floatingLabelStyle,
      isFocused,
      shrink,
    } = this.props;

    const defaultStyles = {
      color: floatingLabelColor,
      cursor: 'pointer',
      lineHeight: '22px',
      pointerEvents: 'none',
      position: 'static',
      top: 0,
      transform: 'scale(1) translateY(0)',
      transformOrigin: 'left top',
      transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
      userSelect: 'none',
      zIndex: 1, // Needed to display label above Chrome's autocomplete field background
      ...floatingLabelStyle,
    };

    const focusStyles = isFocused && shrink && { color: focusColor, ...floatingLabelFocusStyle };

    const shrinkStyles = shrink && {
      cursor: 'default',
      pointerEvents: 'none',
      position: 'absolute',
      transform: `scale(0.75) translateY(-${this.state.flabelHeight}px)`,
    };

    return (
      <label ref={(ref) => (this.flabel = ref)} style={{ ...defaultStyles, ...shrinkStyles, ...focusStyles }}>
        {children}
      </label>
    );
  }
}

FloatingLabel.propTypes = floatingLabelTypes;
FloatingLabel.defaultProps = floatingLabelDefaultProps;

export default FloatingLabel;
