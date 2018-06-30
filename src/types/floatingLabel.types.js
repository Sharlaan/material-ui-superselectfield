import { bool, object, shape, string } from 'prop-types';

export default {
  defaultColors: shape({ floatingLabelColor: string, focusColor: string }),
  floatingLabelFocusStyle: object,
  floatingLabelStyle: object,
  isFocused: bool,
  shrink: bool,
};
