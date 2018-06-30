import { bool, object, string } from 'prop-types';

export default {
  disabled: bool,
  errorText: string,
  isFocused: bool,
  isOpen: bool,
  themeBorderColor: string,
  themeFocusColor: string,
  underlineErrorStyle: object,
  underlineFocusStyle: object,
  underlineStyle: object,
};
