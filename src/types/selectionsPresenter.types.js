import { arrayOf, bool, func, node, object, oneOfType, string } from 'prop-types';

export default {
  disabled: bool,
  dropDownIcon: node,
  errorStyle: object,
  errorText: string,
  floatingLabel: oneOfType([string, node]),
  floatingLabelFocusStyle: object,
  floatingLabelStyle: object,
  hintText: string,
  isFocused: bool,
  isOpen: bool,
  muiTheme: object,
  selectedValues: oneOfType([object, arrayOf(object)]),
  selectionsRenderer: func,
  underlineErrorStyle: object,
  underlineFocusStyle: object,
  underlineStyle: object,
};
