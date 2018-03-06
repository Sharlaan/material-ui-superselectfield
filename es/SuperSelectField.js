const _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
      return typeof obj
    }
    : function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }

const _extends =
  Object.assign ||
  function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i]
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass)
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  })
  if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass) }
}

/**
 * Created by Raphaël Morineau on 28 Oct 2016.
 */
import React, { Component } from 'react'
import { object } from 'prop-types'
import InfiniteScroller from 'react-infinite'
import ListItem from 'material-ui/List/ListItem'
import Popover from 'material-ui/Popover/Popover'
import TextField from 'material-ui/TextField/TextField'
import SelectionsPresenter from './SelectionsPresenter'
import { getChildrenLength, areEqual } from './utils'
import { selectFieldTypes } from './types'
import { selectFieldDefaultProps } from './defaultProps'

const SelectField = (function (_Component) {
  _inherits(SelectField, _Component)

  function SelectField (props, context) {
    _classCallCheck(this, SelectField)

    const _this = _possibleConstructorReturn(this, _Component.call(this, props, context))

    _this.onFocus = function () {
      return _this.setState({ isFocused: true })
    }

    _this.onBlur = function () {
      return !_this.state.isOpen && _this.setState({ isFocused: false })
    }

    _this.closeMenu = function (reason) {
      let _this$props = _this.props,
        onChange = _this$props.onChange,
        name = _this$props.name

      if (reason) _this.setState({ isFocused: false }) // if reason === 'clickaway' or 'offscreen'
      _this.setState({ isOpen: false, searchText: '' }, function () {
        if (!reason) _this.root.focus()
        onChange(_this.state.selectedItems, name)
      })
    }

    _this.handleClick = function (event) {
      return !_this.props.disabled && _this.openMenu()
    }

    _this.handleKeyDown = function (event) {
      return !_this.props.disabled && /ArrowDown|Enter/.test(event.key) && _this.openMenu()
    }

    _this.handleTextFieldAutocompletionFiltering = function (event, searchText) {
      _this.props.onAutoCompleteTyping(searchText)
      _this.setState({ searchText: searchText }, function () {
        return _this.focusTextField()
      })
    }

    _this.handleTextFieldKeyDown = function (_ref) {
      const key = _ref.key

      switch (key) {
        case 'ArrowDown':
          _this.focusMenuItem()
          break

        case 'Escape':
          _this.clearTextField()
          _this.closeMenu()
          break

        default:
          break
      }
    }

    _this.handleMenuSelection = function (selectedItem) {
      return function (event) {
        event.preventDefault()
        const selectedItems = _this.state.selectedItems

        if (_this.props.multiple) {
          const selectedItemExists = selectedItems.some(function (obj) {
            return areEqual(obj.value, selectedItem.value)
          })
          const updatedValues = selectedItemExists
            ? selectedItems.filter(function (obj) {
              return !areEqual(obj.value, selectedItem.value)
            })
            : selectedItems.concat(selectedItem)
          _this.setState({ selectedItems: updatedValues }, function () {
            return _this.getSelected()
          })
          _this.clearTextField(function () {
            return _this.focusTextField()
          })
        } else {
          const updatedValue = areEqual(selectedItems, selectedItem) ? null : selectedItem
          _this.setState({ selectedItems: updatedValue }, function () {
            return _this.closeMenu()
          })
        }
      }
    }

    _this.getSelected = function () {
      return _this.props.onSelect && _this.props.onSelect(_this.state.selectedItems, _this.props.name)
    }

    _this.handleMenuKeyDown = function (_ref2) {
      let key = _ref2.key,
        tabIndex = _ref2.target.tabIndex

      const cleanMenuItems = _this.menuItems.filter(function (item) {
        return !!item
      })
      const firstTabIndex = cleanMenuItems[0].props.tabIndex
      const lastTabIndex = cleanMenuItems[cleanMenuItems.length - 1].props.tabIndex
      const currentElementIndex = cleanMenuItems.findIndex(function (item) {
        return item.props.tabIndex === tabIndex
      })
      switch (key) {
        case 'ArrowUp':
          if (+tabIndex === firstTabIndex) {
            _this.state.showAutocomplete ? _this.focusTextField() : _this.focusMenuItem(lastTabIndex)
          } else {
            const previousTabIndex = cleanMenuItems.slice(0, currentElementIndex).slice(-1)[0].props.tabIndex
            _this.focusMenuItem(previousTabIndex)
          }
          break

        case 'ArrowDown':
          if (+tabIndex === lastTabIndex) {
            _this.state.showAutocomplete ? _this.focusTextField() : _this.focusMenuItem()
          } else {
            const nextTabIndex = cleanMenuItems.slice(currentElementIndex + 1)[0].props.tabIndex
            _this.focusMenuItem(nextTabIndex)
          }
          break

        case 'PageUp':
          _this.focusMenuItem()
          break

        case 'PageDown':
          _this.focusMenuItem(lastTabIndex)
          break

        case 'Escape':
          _this.closeMenu()
          break

        default:
          break
      }
    }

    let children = props.children,
      value = props.value,
      multiple = props.multiple,
      showAutocompleteThreshold = props.showAutocompleteThreshold

    const itemsLength = getChildrenLength(children)
    _this.state = {
      isOpen: false,
      isFocused: false,
      itemsLength: itemsLength,
      showAutocomplete: _this.showAutocomplete(showAutocompleteThreshold, itemsLength),
      selectedItems: value || (multiple ? [] : null),
      searchText: '',
    }
    _this.menuItems = []
    return _this
  }

  SelectField.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
    if (!areEqual(nextProps.value, this.state.selectedItems)) {
      this.setState({ selectedItems: nextProps.value })
    }
    if (!areEqual(nextProps.children, this.props.children)) {
      const itemsLength = getChildrenLength(nextProps.children)
      this.setState({
        itemsLength: itemsLength,
        showAutocomplete: this.showAutocomplete(this.props.showAutocompleteThreshold, itemsLength),
      })
    }
  }

  SelectField.prototype.showAutocomplete = function showAutocomplete () {
    const threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    const itemsLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

    if (typeof threshold === 'number') return itemsLength >= threshold
    switch (threshold) {
      case 'always':
        return true
      case 'never':
      default:
        return false
    }
  }

  SelectField.prototype.componentDidMount = function componentDidMount () {
    // Potential problem with Popover ?
    // https://github.com/callemall/material-ui/blob/master/src/DropDownMenu/DropDownMenu.js#L237
    if (this.props.openImmediately) this.openMenu()
  }

  SelectField.prototype.openMenu = function openMenu () {
    const _this2 = this

    if (!this.state.isOpen) this.props.onMenuOpen()
    if (this.state.itemsLength || this.props.showAutocompleteThreshold === 'always') {
      this.setState({ isOpen: true }, function () {
        return _this2.focusTextField()
      })
    }
  }

  // FIXME: both focusTextField and focusMenuItem don't really focus the targeted element, user must hit another key to trigger the actual focus... need to find a solution for a true direct focus

  SelectField.prototype.focusMenuItem = function focusMenuItem (index) {
    const targetMenuItem = this.menuItems.find(function (item) {
      return !!item && (index ? item.props.tabIndex === index : true)
    })
    if (targetMenuItem) targetMenuItem.applyFocusState('keyboard-focused')
  }

  SelectField.prototype.focusTextField = function focusTextField () {
    this.state.showAutocomplete && this.searchTextField ? this.searchTextField.focus() : this.focusMenuItem()
  }

  SelectField.prototype.clearTextField = function clearTextField (callback) {
    this.props.keepSearchOnSelect
      ? typeof callback === 'function' && callback() // don't reset the autocomplete
      : this.setState({ searchText: '' }, callback)
  }

  /**
   * Main Component Wrapper methods
   */
  // toggle instead of close ? (in case user changes targetOrigin/anchorOrigin)

  /**
   * TextField autocomplete methods
   */

  /**
   * Menu methods
   */

  // TODO: add Shift+Tab
  /**
   * this.menuItems can contain uncontinuous React elements, because of filtering
   */

  SelectField.prototype.render = function render () {
    const _this3 = this

    let _props = this.props,
      anchorOrigin = _props.anchorOrigin,
      autocompleteFilter = _props.autocompleteFilter,
      autocompleteStyle = _props.autocompleteStyle,
      autocompleteUnderlineFocusStyle = _props.autocompleteUnderlineFocusStyle,
      autocompleteUnderlineStyle = _props.autocompleteUnderlineStyle,
      canAutoPosition = _props.canAutoPosition,
      checkPosition = _props.checkPosition,
      checkedIcon = _props.checkedIcon,
      children = _props.children,
      disabled = _props.disabled,
      dropDownIcon = _props.dropDownIcon,
      elementHeight = _props.elementHeight,
      errorStyle = _props.errorStyle,
      errorText = _props.errorText,
      floatingLabel = _props.floatingLabel,
      floatingLabelFocusStyle = _props.floatingLabelFocusStyle,
      floatingLabelStyle = _props.floatingLabelStyle,
      hintText = _props.hintText,
      hintTextAutocomplete = _props.hintTextAutocomplete,
      hoverColor = _props.hoverColor,
      innerDivStyle = _props.innerDivStyle,
      menuCloseButton = _props.menuCloseButton,
      menuFooterStyle = _props.menuFooterStyle,
      menuGroupStyle = _props.menuGroupStyle,
      menuStyle = _props.menuStyle,
      multiple = _props.multiple,
      nb2show = _props.nb2show,
      noMatchFound = _props.noMatchFound,
      noMatchFoundStyle = _props.noMatchFoundStyle,
      popoverClassName = _props.popoverClassName,
      selectedMenuItemStyle = _props.selectedMenuItemStyle,
      selectionsRenderer = _props.selectionsRenderer,
      style = _props.style,
      unCheckedIcon = _props.unCheckedIcon,
      underlineErrorStyle = _props.underlineErrorStyle,
      underlineFocusStyle = _props.underlineFocusStyle,
      underlineStyle = _props.underlineStyle

    // Default style depending on Material-UI context (muiTheme)

    let _context$muiTheme = this.context.muiTheme,
      palette = _context$muiTheme.baseTheme.palette,
      menuItem = _context$muiTheme.menuItem

    const mergedSelectedMenuItemStyle = _extends(
      {
        color: menuItem.selectedTextColor,
      },
      selectedMenuItemStyle
    )
    if (checkedIcon) checkedIcon.props.style.fill = mergedSelectedMenuItemStyle.color
    const mergedHoverColor = hoverColor || menuItem.hoverColor

    /**
     * MenuItems building, based on user's children
     * 1st function is the base process for producing a MenuItem,
     * including filtering from the Autocomplete.
     * 2nd function is the main loop over children array,
     * accounting for optgroups.
     */
    const menuItemBuilder = function menuItemBuilder (nodes, child, index) {
      const selectedItems = _this3.state.selectedItems
      let _child$props = child.props,
        childValue = _child$props.value,
        label = _child$props.label

      if (!autocompleteFilter(_this3.state.searchText, label || childValue)) return nodes
      const isSelected = Array.isArray(selectedItems)
        ? selectedItems.some(function (obj) {
          return areEqual(obj.value, childValue)
        })
        : selectedItems ? selectedItems.value === childValue : false
      const leftCheckbox = (multiple && checkPosition === 'left' && (isSelected ? checkedIcon : unCheckedIcon)) || null
      const rightCheckbox = (multiple && checkPosition === 'right' && (isSelected ? checkedIcon : unCheckedIcon)) || null
      if (multiple && checkPosition !== '') {
        if (checkedIcon) checkedIcon.props.style.marginTop = 0
        if (unCheckedIcon) unCheckedIcon.props.style.marginTop = 0
      }
      return [].concat(nodes, [
        React.createElement(ListItem, {
          key: ++index,
          tabIndex: index,
          ref: function ref (_ref3) {
            return (_this3.menuItems[++index] = _ref3)
          },
          onClick: _this3.handleMenuSelection({ value: childValue, label: label }),
          disableFocusRipple: true,
          leftIcon: leftCheckbox,
          rightIcon: rightCheckbox,
          primaryText: child,
          hoverColor: mergedHoverColor,
          innerDivStyle: _extends(
            {
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: multiple && checkPosition === 'left' ? 56 : 16,
              paddingRight: multiple && checkPosition === 'right' ? 56 : 16,
            },
            innerDivStyle
          ),
          style: isSelected ? mergedSelectedMenuItemStyle : {},
        }),
      ])
    }

    const fixedChildren = Array.isArray(children) ? children : [children]

    const menuItems =
      !disabled &&
      fixedChildren.length &&
      this.state.isOpen &&
      fixedChildren.reduce(function (nodes, child, index) {
        if (child.type !== 'optgroup') return menuItemBuilder(nodes, child, index)
        const nextIndex = nodes.length ? +nodes[nodes.length - 1].key + 1 : 0
        const menuGroup = React.createElement(ListItem, {
          disabled: true,
          key: nextIndex,
          primaryText: child.props.label,
          style: _extends({ cursor: 'default', paddingTop: 10, paddingBottom: 10 }, menuGroupStyle),
        })
        let groupedItems = []
        const cpc = child.props.children
        if (cpc) {
          if (Array.isArray(cpc) && cpc.length) {
            groupedItems = cpc.reduce(function (nodes, child, idx) {
              return menuItemBuilder(nodes, child, nextIndex + idx)
            }, [])
          } else if ((typeof cpc === 'undefined' ? 'undefined' : _typeof(cpc)) === 'object') { groupedItems = menuItemBuilder(nodes, cpc, nextIndex) }
        }
        return groupedItems.length ? [].concat(nodes, [menuGroup], groupedItems) : nodes
      }, [])

    /*
    const menuItemsHeights = this.state.isOpen
      ? this.menuItems.map(item => findDOMNode(item).clientHeight) // can't resolve since items not rendered yet, need componentDiDMount
      : elementHeight
    */
    const autoCompleteHeight = this.state.showAutocomplete ? 53 : 0
    const footerHeight = menuCloseButton ? 36 : 0
    const noMatchFoundHeight = 36
    const containerHeight =
      (Array.isArray(elementHeight)
        ? elementHeight.reduce(function (totalHeight, height) {
          return totalHeight + height
        }, 6)
        : elementHeight * (nb2show < menuItems.length ? nb2show : menuItems.length) + 6) || 0
    const popoverHeight = autoCompleteHeight + (containerHeight || noMatchFoundHeight) + footerHeight
    const scrollableStyle = { overflowY: nb2show >= menuItems.length ? 'hidden' : 'scroll' }
    const menuWidth = this.root ? this.root.clientWidth : null

    return React.createElement(
      'div',
      {
        ref: function ref (_ref6) {
          return (_this3.root = _ref6)
        },
        tabIndex: disabled ? '-1' : '0',
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleClick,
        title: !this.state.itemsLength ? 'Nothing to show' : '',
        style: _extends(
          {
            cursor: disabled ? 'not-allowed' : 'pointer',
            color: disabled ? palette.disabledColor : palette.textColor,
          },
          style
        ),
      },
      React.createElement(SelectionsPresenter, {
        isFocused: this.state.isFocused,
        isOpen: this.state.isOpen,
        disabled: disabled,
        hintText: hintText,
        errorText: errorText,
        errorStyle: errorStyle,
        underlineErrorStyle: underlineErrorStyle,
        muiTheme: this.context.muiTheme,
        selectedValues: this.state.selectedItems,
        selectionsRenderer: selectionsRenderer,
        floatingLabel: floatingLabel,
        floatingLabelStyle: floatingLabelStyle,
        floatingLabelFocusStyle: floatingLabelFocusStyle,
        underlineStyle: underlineStyle,
        underlineFocusStyle: underlineFocusStyle,
        dropDownIcon: dropDownIcon,
      }),
      React.createElement(
        Popover,
        {
          open: this.state.isOpen,
          anchorEl: this.root,
          canAutoPosition: canAutoPosition,
          className: popoverClassName,
          anchorOrigin: anchorOrigin,
          useLayerForClickAway: false,
          onRequestClose: this.closeMenu,
          style: { height: popoverHeight },
        },
        this.state.showAutocomplete &&
          React.createElement(TextField, {
            ref: function ref (_ref4) {
              return (_this3.searchTextField = _ref4)
            },
            value: this.state.searchText,
            hintText: hintTextAutocomplete,
            onChange: this.handleTextFieldAutocompletionFiltering,
            onKeyDown: this.handleTextFieldKeyDown,
            style: { marginLeft: 16, marginBottom: 5, width: menuWidth - 16 * 2 },
            inputStyle: autocompleteStyle,
            underlineStyle: autocompleteUnderlineStyle,
            underlineFocusStyle: autocompleteUnderlineFocusStyle,
            autoFocus: true,
          }),
        React.createElement(
          'div',
          {
            ref: function ref (_ref5) {
              return (_this3.menu = _ref5)
            },
            onKeyDown: this.handleMenuKeyDown,
            style: _extends({ width: menuWidth }, menuStyle),
          },
          menuItems.length
            ? React.createElement(
              InfiniteScroller,
              {
                elementHeight: elementHeight,
                containerHeight: containerHeight,
                styles: { scrollableStyle: scrollableStyle },
              },
              menuItems
            )
            : React.createElement(ListItem, {
              disabled: true,
              primaryText: noMatchFound,
              style: _extends({ cursor: 'default', padding: '10px 16px' }, noMatchFoundStyle),
            })
        ),
        multiple &&
          React.createElement(
            'footer',
            { style: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' } },
            React.createElement('div', { onClick: this.closeMenu, style: menuFooterStyle }, menuCloseButton)
          )
      )
    )
  }

  return SelectField
})(Component)

SelectField.contextTypes = {
  muiTheme: object.isRequired,
}
SelectField.propTypes = process.env.NODE_ENV !== 'production' ? selectFieldTypes : {}
SelectField.defaultProps = selectFieldDefaultProps

export default SelectField
