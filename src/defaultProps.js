import React from 'react'
import CheckedIcon from 'material-ui/svg-icons/navigation/check'
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'

export const floatingLabelDefaultProps = {
  shrink: false
}

export const selectionsPresenterDefaultProps = {
  hintText: 'Click me',
  errorText: '',
  errorStyle: {},
  underlineErrorStyle: {},
  selectionsRenderer: (values, hintText) => {
    if (!values) return hintText
    const { value, label } = values
    if (Array.isArray(values)) {
      return values.length
        ? values.map(({ value, label }) => label || value).join(', ')
        : hintText
    }
    else if (label || value) return label || value
    else return hintText
  }
}

export const selectFieldDefaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  checkPosition: '',
  checkedIcon: <CheckedIcon style={{ top: 'calc(50% - 12px)' }} />,
  unCheckedIcon: <UnCheckedIcon style={{ top: 'calc(50% - 12px)' }} />,
  menuCloseButton: null,
  canAutoPosition: true,
  multiple: false,
  openImmediately: false,
  keepSearchOnSelect: false,
  disabled: false,
  nb2show: 5,
  hintTextAutocomplete: 'Type something',
  noMatchFound: 'No match found',
  noMatchFoundStyle: {},
  showAutocompleteThreshold: 10,
  elementHeight: 36,
  autocompleteFilter: (searchText, text) => {
    if (!text || (typeof text !== 'string' && typeof text !== 'number')) return false
    if (typeof searchText !== 'string' && typeof searchText !== 'number') return false
    return (text + '').toLowerCase().includes(searchText.toLowerCase())
  },
  value: null,
  onChange: () => {},
  onSelect: () => {},
  onMenuOpen: () => {},
  onAutoCompleteTyping: () => {},
  children: []
}
