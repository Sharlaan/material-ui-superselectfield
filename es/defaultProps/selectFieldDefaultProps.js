import React from 'react'
import CheckedIcon from 'material-ui/svg-icons/navigation/check'
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'

export default {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  autocompleteFilter: function autocompleteFilter (searchText, text) {
    if (!text || (typeof text !== 'string' && typeof text !== 'number')) return false
    if (typeof searchText !== 'string' && typeof searchText !== 'number') return false
    return (text + '').toLowerCase().includes(searchText.toLowerCase())
  },
  autocompleteStyle: {},
  canAutoPosition: true,
  checkPosition: '',
  checkedIcon: React.createElement(CheckedIcon, { style: { top: 'calc(50% - 12px)' } }),
  children: [],
  disabled: false,
  elementHeight: 36,
  hintTextAutocomplete: 'Type something',
  keepSearchOnSelect: false,
  menuCloseButton: null,
  multiple: false,
  nb2show: 5,
  noMatchFound: 'No match found',
  noMatchFoundStyle: {},
  onAutoCompleteTyping: function onAutoCompleteTyping () {},
  onChange: function onChange () {},
  onMenuOpen: function onMenuOpen () {},
  onSelect: function onSelect () {},
  openImmediately: false,
  popoverClassName: '',
  showAutocompleteThreshold: 10,
  unCheckedIcon: React.createElement(UnCheckedIcon, { style: { top: 'calc(50% - 12px)' } }),
  value: null,
}
