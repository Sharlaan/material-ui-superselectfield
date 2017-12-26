import React from 'react';
import CheckedIcon from 'material-ui/svg-icons/navigation/check';
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';

export var floatingLabelDefaultProps = {
  shrink: false
};

export var selectionsPresenterDefaultProps = {
  hintText: 'Click me',
  errorText: '',
  errorStyle: {},
  underlineErrorStyle: {},
  selectionsRenderer: function selectionsRenderer(values, hintText) {
    if (!values) return hintText;
    var value = values.value,
        label = values.label;

    if (Array.isArray(values)) {
      return values.length ? values.map(function (_ref) {
        var value = _ref.value,
            label = _ref.label;
        return label || value;
      }).join(', ') : hintText;
    } else if (label || value) return label || value;else return hintText;
  }
};

export var selectFieldDefaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  checkPosition: '',
  checkedIcon: React.createElement(CheckedIcon, { style: { top: 'calc(50% - 12px)' } }),
  unCheckedIcon: React.createElement(UnCheckedIcon, { style: { top: 'calc(50% - 12px)' } }),
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
  autocompleteFilter: function autocompleteFilter(searchText, text) {
    if (!text || typeof text !== 'string' && typeof text !== 'number') return false;
    if (typeof searchText !== 'string' && typeof searchText !== 'number') return false;
    return (text + '').toLowerCase().includes(searchText.toLowerCase());
  },
  value: null,
  onChange: function onChange() {},
  onSelect: function onSelect() {},
  onMenuOpen: function onMenuOpen() {},
  onAutoCompleteTyping: function onAutoCompleteTyping() {},
  children: []
};