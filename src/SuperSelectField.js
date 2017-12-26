
/**
 * Created by Raphaël Morineau on 28 Oct 2016.
 */
import React, { Component } from 'react'
import InfiniteScroller from 'react-infinite'
import ListItem from 'material-ui/List/ListItem'
import Popover from 'material-ui/Popover/Popover'
import TextField from 'material-ui/TextField/TextField'
import SelectionsPresenter from './SelectionsPresenter'
import { getChildrenLength, areEqual } from './utils'
import PropTypes from 'prop-types'
import { selectFieldTypes } from './types'
import { selectFieldDefaultProps } from './defaultProps'

class SelectField extends Component {
  constructor(props, context) {
    super(props, context)
    const { children, value, multiple, showAutocompleteThreshold } = props
    const itemsLength = getChildrenLength(children)
    this.state = {
      isOpen: false,
      isFocused: false,
      itemsLength,
      showAutocomplete: this.showAutocomplete(showAutocompleteThreshold, itemsLength),
      selectedItems: value || (multiple ? [] : null),
      searchText: ''
    }
    this.menuItems = []
  }

  componentWillReceiveProps(nextProps) {
    if (!areEqual(nextProps.value, this.state.selectedItems)) {
      this.setState({ selectedItems: nextProps.value })
    }
    if (!areEqual(nextProps.children, this.props.children)) {
      const itemsLength = getChildrenLength(nextProps.children)
      this.setState({
        itemsLength,
        showAutocomplete: this.showAutocomplete(this.props.showAutocompleteThreshold, itemsLength)
      })
    }
  }

  showAutocomplete(threshold = 0, itemsLength = 0) {
    if (typeof threshold === 'number') return itemsLength >= threshold
    switch (threshold) {
      case 'always':
        return true
      case 'never':
      default:
        return false
    }
  }

  componentDidMount() {
    // Potential problem with Popover ?
    // https://github.com/callemall/material-ui/blob/master/src/DropDownMenu/DropDownMenu.js#L237
    if (this.props.openImmediately) this.openMenu()
  }

  onFocus = () => this.setState({ isFocused: true })

  onBlur = () => !this.state.isOpen && this.setState({ isFocused: false })

  closeMenu = (reason) => {
    const { onChange, name } = this.props
    if (reason) this.setState({ isFocused: false }) // if reason === 'clickaway' or 'offscreen'
    this.setState({ isOpen: false, searchText: '' }, () => {
      if (!reason) this.root.focus()
      onChange(this.state.selectedItems, name)
    })
  }

  openMenu() {
    if (!this.state.isOpen) this.props.onMenuOpen()
    if (this.state.itemsLength || this.props.showAutocompleteThreshold === 'always') {
      this.setState({ isOpen: true }, () => this.focusTextField())
    }
  }

  // FIXME: both focusTextField and focusMenuItem don't really focus the targeted element, user must hit another key to trigger the actual focus... need to find a solution for a true direct focus
  focusMenuItem(index) {
    const targetMenuItem = this.menuItems.find(item => {
      return !!item && (index ? item.props.tabIndex === index : true)
    })
    if (targetMenuItem) targetMenuItem.applyFocusState('keyboard-focused')
  }

  focusTextField() {
    this.state.showAutocomplete && this.searchTextField
      ? this.searchTextField.focus()
      : this.focusMenuItem()
  }

  clearTextField(callback) {
    this.props.keepSearchOnSelect
      ? callback() // don't reset the autocomplete
      : this.setState({ searchText: '' }, callback)
  }

  /**
   * Main Component Wrapper methods
   */
  // toggle instead of close ? (in case user changes targetOrigin/anchorOrigin)
  handleClick = (event) => !this.props.disabled && this.openMenu()

  handleKeyDown = (event) =>
    !this.props.disabled && /ArrowDown|Enter/.test(event.key) && this.openMenu()

  /**
   * TextField autocomplete methods
   */
  handleTextFieldAutocompletionFiltering = (event, searchText) => {
    this.props.onAutoCompleteTyping(searchText)
    this.setState({ searchText }, () => this.focusTextField())
  }

  handleTextFieldKeyDown = ({ key }) => {
    switch (key) {
      case 'ArrowDown':
        this.focusMenuItem()
        break

      case 'Escape':
        this.clearTextField()
        this.closeMenu()
        break

      default: break
    }
  }

  /**
   * Menu methods
   */
  handleMenuSelection = (selectedItem) => (event) => {
    event.preventDefault()
    const { selectedItems } = this.state
    if (this.props.multiple) {
      const selectedItemExists = selectedItems.some(obj => areEqual(obj.value, selectedItem.value))
      const updatedValues = selectedItemExists
        ? selectedItems.filter(obj => !areEqual(obj.value, selectedItem.value))
        : selectedItems.concat(selectedItem)
      this.setState({ selectedItems: updatedValues }, () => this.getSelected())
      this.clearTextField(() => this.focusTextField())
    }
    else {
      const updatedValue = areEqual(selectedItems, selectedItem) ? null : selectedItem
      this.setState({ selectedItems: updatedValue }, () => this.closeMenu())
    }
  }

  getSelected = () => this.props.onSelect && this.props.onSelect(this.state.selectedItems, this.props.name);

  // TODO: add Shift+Tab
  /**
   * this.menuItems can contain uncontinuous React elements, because of filtering
   */
  handleMenuKeyDown = ({ key, target: { tabIndex } }) => {
    const cleanMenuItems = this.menuItems.filter(item => !!item)
    const firstTabIndex = cleanMenuItems[0].props.tabIndex
    const lastTabIndex = cleanMenuItems[cleanMenuItems.length - 1].props.tabIndex
    const currentElementIndex = cleanMenuItems.findIndex(item => item.props.tabIndex === tabIndex)
    switch (key) {
      case 'ArrowUp':
        if (+tabIndex === firstTabIndex) {
          this.state.showAutocomplete
            ? this.focusTextField()
            : this.focusMenuItem(lastTabIndex)
        }
        else {
          const previousTabIndex = cleanMenuItems
            .slice(0, currentElementIndex)
            .slice(-1)[0]
            .props.tabIndex
          this.focusMenuItem(previousTabIndex)
        }
        break

      case 'ArrowDown':
        if (+tabIndex === lastTabIndex) {
          this.state.showAutocomplete
            ? this.focusTextField()
            : this.focusMenuItem()
        }
        else {
          const nextTabIndex = cleanMenuItems
            .slice(currentElementIndex + 1)[0]
            .props.tabIndex
          this.focusMenuItem(nextTabIndex)
        }
        break

      case 'PageUp':
        this.focusMenuItem()
        break

      case 'PageDown':
        this.focusMenuItem(lastTabIndex)
        break

      case 'Escape':
        this.closeMenu()
        break

      default: break
    }
  }

  render() {
    const { children, floatingLabel, hintText, hintTextAutocomplete, multiple, disabled, nb2show,
      autocompleteFilter, selectionsRenderer, menuCloseButton, anchorOrigin, canAutoPosition,
      style, menuStyle, elementHeight, innerDivStyle, selectedMenuItemStyle, menuGroupStyle, menuFooterStyle,
      floatingLabelStyle, floatingLabelFocusStyle, underlineStyle, underlineFocusStyle,
      autocompleteUnderlineStyle, autocompleteUnderlineFocusStyle, noMatchFound, noMatchFoundStyle,
      checkedIcon, unCheckedIcon, hoverColor, checkPosition, errorText, errorStyle, underlineErrorStyle
    } = this.props

    // Default style depending on Material-UI context (muiTheme)
    const { baseTheme: { palette }, menuItem } = this.context.muiTheme

    const mergedSelectedMenuItemStyle = {
      color: menuItem.selectedTextColor, ...selectedMenuItemStyle
    }
    if (checkedIcon) checkedIcon.props.style.fill = mergedSelectedMenuItemStyle.color
    const mergedHoverColor = hoverColor || menuItem.hoverColor

    /**
     * MenuItems building, based on user's children
     * 1st function is the base process for producing a MenuItem,
     * including filtering from the Autocomplete.
     * 2nd function is the main loop over children array,
     * accounting for optgroups.
     */
    const menuItemBuilder = (nodes, child, index) => {
      const { selectedItems } = this.state
      const { value: childValue, label } = child.props
      if (!autocompleteFilter(this.state.searchText, label || childValue)) return nodes
      const isSelected = Array.isArray(selectedItems)
        ? selectedItems.some(obj => areEqual(obj.value, childValue))
        : selectedItems ? selectedItems.value === childValue : false
      const leftCheckbox = (multiple && checkPosition === 'left' && (isSelected ? checkedIcon : unCheckedIcon)) || null
      const rightCheckbox = (multiple && checkPosition === 'right' && (isSelected ? checkedIcon : unCheckedIcon)) || null
      if (multiple && checkPosition !== '') {
        if (checkedIcon) checkedIcon.props.style.marginTop = 0
        if (unCheckedIcon) unCheckedIcon.props.style.marginTop = 0
      }
      return [...nodes, (
        <ListItem
          key={++index}
          tabIndex={index}
          ref={ref => (this.menuItems[++index] = ref)}
          onClick={this.handleMenuSelection({ value: childValue, label })}
          disableFocusRipple
          leftIcon={leftCheckbox}
          rightIcon={rightCheckbox}
          primaryText={child}
          hoverColor={mergedHoverColor}
          innerDivStyle={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: (multiple && checkPosition === 'left') ? 56 : 16,
            paddingRight: (multiple && checkPosition === 'right') ? 56 : 16,
            ...innerDivStyle
          }}
          style={isSelected ? mergedSelectedMenuItemStyle : {}}
        />)]
    }

    const fixedChildren = Array.isArray(children) ? children : [children]

    const menuItems = !disabled && fixedChildren.length && this.state.isOpen &&
      fixedChildren.reduce((nodes, child, index) => {
        if (child.type !== 'optgroup') return menuItemBuilder(nodes, child, index)
        const nextIndex = nodes.length ? +nodes[nodes.length - 1].key + 1 : 0
        const menuGroup =
          <ListItem
            disabled
            key={nextIndex}
            primaryText={child.props.label}
            style={{ cursor: 'default', paddingTop: 10, paddingBottom: 10, ...menuGroupStyle }}
          />
        let groupedItems = []
        const cpc = child.props.children
        if (cpc) {
          if (Array.isArray(cpc) && cpc.length) {
            groupedItems = cpc.reduce((nodes, child, idx) =>
              menuItemBuilder(nodes, child, nextIndex + idx), [])
          }
          else if (typeof cpc === 'object') groupedItems = menuItemBuilder(nodes, cpc, nextIndex)
        }
        return groupedItems.length
          ? [...nodes, menuGroup, ...groupedItems]
          : nodes
      }, [])

    /*
    const menuItemsHeights = this.state.isOpen
      ? this.menuItems.map(item => findDOMNode(item).clientHeight) // can't resolve since items not rendered yet, need componentDiDMount
      : elementHeight
    */
    const autoCompleteHeight = this.state.showAutocomplete ? 53 : 0
    const footerHeight = menuCloseButton ? 36 : 0
    const noMatchFoundHeight = 36
    const containerHeight = (Array.isArray(elementHeight)
      ? elementHeight.reduce((totalHeight, height) => totalHeight + height, 6)
      : (elementHeight * (nb2show < menuItems.length ? nb2show : menuItems.length)) + 6
    ) || 0
    const popoverHeight = autoCompleteHeight + (containerHeight || noMatchFoundHeight) + footerHeight
    const scrollableStyle = { overflowY: nb2show >= menuItems.length ? 'hidden' : 'scroll' }
    const menuWidth = this.root ? this.root.clientWidth : null

    return (
      <div
        ref={ref => (this.root = ref)}
        tabIndex={disabled ? '-1' : '0'}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        title={!this.state.itemsLength ? 'Nothing to show' : ''}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          color: disabled ? palette.disabledColor : palette.textColor,
          ...style
        }}
      >

        <SelectionsPresenter
          isFocused={this.state.isFocused}
          isOpen={this.state.isOpen}
          disabled={disabled}
          hintText={hintText}
          errorText={errorText}
          errorStyle={errorStyle}
          underlineErrorStyle={underlineErrorStyle}
          muiTheme={this.context.muiTheme}
          selectedValues={this.state.selectedItems}
          selectionsRenderer={selectionsRenderer}
          floatingLabel={floatingLabel}
          floatingLabelStyle={floatingLabelStyle}
          floatingLabelFocusStyle={floatingLabelFocusStyle}
          underlineStyle={underlineStyle}
          underlineFocusStyle={underlineFocusStyle}
        />

        <Popover
          open={this.state.isOpen}
          anchorEl={this.root}
          canAutoPosition={canAutoPosition}
          anchorOrigin={anchorOrigin}
          useLayerForClickAway={false}
          onRequestClose={this.closeMenu}
          style={{ height: popoverHeight }}
        >
          {this.state.showAutocomplete &&
            <TextField
              ref={ref => (this.searchTextField = ref)}
              value={this.state.searchText}
              hintText={hintTextAutocomplete}
              onChange={this.handleTextFieldAutocompletionFiltering}
              onKeyDown={this.handleTextFieldKeyDown}
              style={{ marginLeft: 16, marginBottom: 5, width: menuWidth - (16 * 2) }}
              underlineStyle={autocompleteUnderlineStyle}
              underlineFocusStyle={autocompleteUnderlineFocusStyle}
              autoFocus
            />
          }
          <div
            ref={ref => (this.menu = ref)}
            onKeyDown={this.handleMenuKeyDown}
            style={{ width: menuWidth, ...menuStyle }}
          >
            {menuItems.length
              ? <InfiniteScroller
                elementHeight={elementHeight}
                containerHeight={containerHeight}
                styles={{ scrollableStyle }}
              >
                {menuItems}
              </InfiniteScroller>
              : <ListItem disabled primaryText={noMatchFound}
                style={{ cursor: 'default', padding: '10px 16px', ...noMatchFoundStyle }} />
            }
          </div>
          {multiple &&
            <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div onClick={this.closeMenu} style={menuFooterStyle}>
                {menuCloseButton}
              </div>
            </footer>
          }
        </Popover>

      </div>
    )
  }
}

SelectField.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
SelectField.propTypes = selectFieldTypes
SelectField.defaultProps = selectFieldDefaultProps

export default SelectField
