import React, { Component } from 'react';

// TODO: implement style lock when disabled = true
class FloatingLabel extends Component {
  constructor(props) {
    super(props);
    this.state = { flabelHeight: 0 };
  }

  componentDidMount() {
    this.setState({ flabelHeight: this.flabel.offsetHeight });
  }

  render() {
    const {
      children,
      shrink,
      isFocused /* disabled, */,
      defaultColors: { floatingLabelColor, focusColor },
      floatingLabelStyle,
      floatingLabelFocusStyle
    } = this.props;
    const defaultStyles = {
      position: 'static',
      top: 0,
      lineHeight: '22px',
      zIndex: 1, // Needed to display label above Chrome's autocomplete field background
      transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
      transform: 'scale(1) translateY(0)',
      transformOrigin: 'left top',
      pointerEvents: 'auto',
      cursor: 'pointer',
      userSelect: 'none',
      color: floatingLabelColor,
      ...floatingLabelStyle
    };

    const focusStyles = isFocused && shrink && { color: focusColor, ...floatingLabelFocusStyle };

    const shrinkStyles = shrink && {
      position: 'absolute',
      transform: `scale(0.75) translateY(-${this.state.flabelHeight}px)`,
      pointerEvents: 'none',
      cursor: 'default'
    };

    return (
      <label
        ref={ref => (this.flabel = ref)}
        style={{ ...defaultStyles, ...shrinkStyles, ...focusStyles }}
      >
        {children}
      </label>
    );
  }
}

FloatingLabel.defaultProps = {
  disabled: false,
  shrink: false
};

export default FloatingLabel;
