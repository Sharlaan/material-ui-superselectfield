import { shape, arrayOf, func, oneOf, oneOfType, any, node, object, string, number, bool } from 'prop-types';
import { checkFormat } from '../utils';

export default {
  anchorOrigin: shape({
    vertical: oneOf(['top', 'bottom']),
    horizontal: oneOf(['left', 'right']),
  }),
  autocompleteFilter: func,
  autocompleteStyle: object,
  autocompleteUnderlineFocusStyle: object,
  autocompleteUnderlineStyle: object,
  canAutoPosition: bool,
  checkedIcon: node,
  checkPosition: oneOf(['', 'left', 'right']),
  // children can be either:
  // an html element with a required 'value' property, and optional label prop,
  // an optgroup with valid children (same as bove case),
  // an array of either valid chidlren, or of optgroups hosting valid children
  children: oneOfType([
    shape({
      value: any.isRequired,
      label: string,
    }),
    (props, propName, componentName, location, propFullName) => {
      const pp = props[propName];
      if (pp.type === 'optgroup' && pp.props.children) {
        if (Array.isArray(pp.props.children)) {
          for (const child of pp.props.children) {
            if (!child.props.value) {
              return new Error(`
              Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.`);
            }
          }
        } else if (typeof pp.props.children === 'object' && !pp.props.children.props.value) {
          return new Error(`
          Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.`);
        }
      }
    },
    arrayOf((props, propName, componentName, location, propFullName) => {
      if (props[propName].type !== 'optgroup') {
        if (!props[propName].props.value) {
          return new Error(`
          Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.`);
        }
      } else {
        for (const child of props[propName].props.children) {
          if (!child.props.value) {
            return new Error(`
            Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.`);
          }
        }
      }
    }),
  ]),
  disabled: bool,
  elementHeight: oneOfType([number, arrayOf(number)]),
  floatingLabel: oneOfType([string, node]),
  hintText: string,
  hintTextAutocomplete: oneOfType([string, node]),
  hoverColor: string,
  innerDivStyle: object,
  keepSearchOnSelect: bool,
  menuCloseButton: node,
  menuFooterStyle: object,
  menuGroupStyle: object,
  menuStyle: object,
  multiple: bool,
  name: string,
  nb2show: number,
  noMatchFound: string,
  noMatchFoundStyle: object,
  onAutoCompleteTyping: func,
  onChange: func,
  onMenuOpen: func,
  onSelect: func,
  openImmediately: bool,
  popoverClassName: string,
  popoverWidth: number,
  resetButton: node,
  selectAllButton: node,
  selectedMenuItemStyle: object,
  selectionsRenderer: func,
  showAutocompleteThreshold: oneOfType([number, oneOf(['always', 'never'])]),
  style: object,
  unCheckedIcon: node,
  underlineFocusStyle: object,
  underlineStyle: object,
  value: (props, propName, componentName, location, propFullName) => {
    const { multiple, value } = props;
    if (multiple) {
      if (!Array.isArray(value)) {
        return new Error(`
          When using 'multiple' mode, 'value' of '${componentName} ${props.name}' must be an array.`);
      } else {
        const index = checkFormat(value);
        if (index !== -1) {
          return new Error(`
            'value[${index}]' of '${componentName} ${props.name}' must include a 'value' property.`);
        }
      }
    } else if (value !== null && (typeof value !== 'object' || !('value' in value))) {
      return new Error(`
        'value' of '${componentName} ${props.name}' must include a 'value' property.`);
    }
  },
  withResetSelectAllButtons: bool,
};
