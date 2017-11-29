import propTypes from 'prop-types'
import { checkFormat } from '../utils'

const { shape, arrayOf, func, oneOf, oneOfType, any, node, object, string, number, bool } = propTypes

export const floatingLabelTypes = {
  shrink: bool
}

export const selectionsPresenterTypes = {
  selectionsRenderer: func,
  hintText: string,
  errorText: string,
  errorStyle: object,
  underlineErrorStyle: object
}

export const selectFieldTypes = {
  anchorOrigin: shape({
    vertical: oneOf(['top', 'bottom']),
    horizontal: oneOf(['left', 'right'])
  }),
  style: object,
  menuStyle: object,
  menuGroupStyle: object,
  checkPosition: oneOf(['', 'left', 'right']),
  checkedIcon: node,
  unCheckedIcon: node,
  hoverColor: string,
  // children can be either:
  // an html element with a required 'value' property, and optional label prop,
  // an optgroup with valid children (same as bove case),
  // an array of either valid chidlren, or of optgroups hosting valid children
  children: oneOfType([
    shape({
      value: any.isRequired,
      label: string
    }),
    (props, propName, componentName, location, propFullName) => {
      const pp = props[propName]
      if (pp.type === 'optgroup' && pp.props.children) {
        if (Array.isArray(pp.props.children)) {
          for (let child of pp.props.children) {
            if (!child.props.value) {
              return new Error(`
              Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.
              Validation failed.`
              )
            }
          }
        }
        else if (typeof pp.props.children === 'object' && !pp.props.children.props.value) {
          return new Error(`
          Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.
          Validation failed.`
          )
        }
      }
    },
    arrayOf((props, propName, componentName, location, propFullName) => {
      if (props[propName].type !== 'optgroup') {
        if (!props[propName].props.value) {
          return new Error(`
          Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.
          Validation failed.`
          )
        }
      }
      else {
        for (let child of props[propName].props.children) {
          if (!child.props.value) {
            return new Error(`
            Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.
            Validation failed.`
            )
          }
        }
      }
    })
  ]),
  innerDivStyle: object,
  selectedMenuItemStyle: object,
  menuFooterStyle: object,
  name: string,
  floatingLabel: oneOfType([string, node]),
  floatingLabelFocusStyle: object,
  underlineStyle: object,
  underlineFocusStyle: object,
  autocompleteUnderlineStyle: object,
  autocompleteUnderlineFocusStyle: object,
  hintText: string,
  hintTextAutocomplete: string,
  noMatchFound: string,
  noMatchFoundStyle: object,
  showAutocompleteThreshold: oneOfType([
    number,
    oneOf(['always', 'never'])
  ]),
  elementHeight: oneOfType([
    number,
    arrayOf(number)
  ]),
  nb2show: number,
  /*  value: oneOfType([
    shape({
      value: any.isRequired,
      label: string
    },
    arrayOf(shape({
      value: any.isRequired,
      label: string
    })
  ]), */
  value: (props, propName, componentName, location, propFullName) => {
    const { multiple, value } = props
    if (multiple) {
      const index = checkFormat(value)
      if (!Array.isArray(value)) {
        return new Error(`
          When using 'multiple' mode, 'value' of '${componentName} ${props.name}' must be an array.
          Validation failed.`
        )
      }
      else if (index !== -1) {
        return new Error(`
          'value[${index}]' of '${componentName} ${props.name}' must be an object including a 'value' property.
          Validation failed.`
        )
      }
    }
    else if (value !== null && (typeof value !== 'object' || !('value' in value))) {
      return new Error(`
        'value' of '${componentName} ${props.name}' must be an object including a 'value' property.
        Validation failed.`
      )
    }
  },
  autocompleteFilter: func,
  selectionsRenderer: func,
  menuCloseButton: node,
  canAutoPosition: bool,
  multiple: bool,
  openImmediately: bool,
  keepSearchOnSelect: bool,
  disabled: bool,
  onChange: func,
  onMenuOpen: func,
  onAutoCompleteTyping: func
}
