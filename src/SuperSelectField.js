import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import InfiniteScroller from 'react-infinite'
import Popover from 'material-ui/Popover/Popover'
import TextField from 'material-ui/TextField/TextField'
import ListItem from 'material-ui/List/ListItem'
import CheckedIcon from 'material-ui/svg-icons/navigation/check'
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'

// Utilities
function areEqual (val1, val2) {
  if (!val1 || !val2 || typeof val1 !== typeof val2) return false
  else if (typeof val1 === 'string' ||
    typeof val1 === 'number' ||
    typeof val1 === 'boolean') return val1 === val2
  else if (typeof val1 === 'object') {
    return Object.keys(val1).length === Object.keys(val2).length &&
      Object.entries(val2).every(([key2, value2]) => val1[key2] === value2)
  }
}

const checkFormat = value => value.findIndex(v => typeof v !== 'object' || !('value' in v))

// ================================================================
// ====================  SelectionsPresenter  =====================
// ================================================================

// noinspection JSDuplicatedDeclaration
const styles = {
  div1: {
    height: '100%',
    display: '-webkit-box',
    display: '-webkit-flex', // eslint-disable-line no-dupe-keys
    display: '-moz-box', // eslint-disable-line no-dupe-keys
    display: '-ms-flexbox', // eslint-disable-line no-dupe-keys
    display: '-o-flex', // eslint-disable-line no-dupe-keys
    display: 'flex', // eslint-disable-line no-dupe-keys
    WebkitBoxOrient: 'vertical',
    WebkitBoxDirection: 'normal',
    WebkitFlexDirection: 'column',
    msFlexDirection: 'column',
    OFlexDirection: 'column',
    flexDirection: 'column',
    WebkitBoxPack: 'end',
    WebkitJustifyContent: 'flex-end',
    msFlexPack: 'end',
    OJustifyContent: 'flex-end',
    justifyContent: 'flex-end'
  },
  div2: {
    display: '-webkit-box',
    display: '-webkit-flex', // eslint-disable-line no-dupe-keys
    display: '-moz-box', // eslint-disable-line no-dupe-keys
    display: '-ms-flexbox', // eslint-disable-line no-dupe-keys
    display: '-o-flex', // eslint-disable-line no-dupe-keys
    display: 'flex', // eslint-disable-line no-dupe-keys
    WebkitBoxPack: 'end',
    WebkitJustifyContent: 'flex-end',
    msFlexPack: 'end',
    OJustifyContent: 'flex-end',
    justifyContent: 'flex-end',
    WebkitAlignItems: 'center',
    MozAlignItems: 'center',
    msAlignItems: 'center',
    OAlignItems: 'center',
    alignItems: 'center'
  },
  div3: {
    WebkitBoxFlex: 1,
    MozBoxFlex: 1,
    WebkitFlex: 1,
    msFlex: 1,
    OFlex: 1,
    flex: 1
  }
}

const SelectionsPresenter = ({ selectedValues, hintText, selectionsRenderer }) => {
  // TODO: add floatingLabelText
  return (
    <div style={styles.div1}>

      <div style={styles.div2}>
        <div style={styles.div3}>
          {selectionsRenderer(selectedValues, hintText)}
        </div>
        <DropDownArrow />
      </div>

      <hr style={{ width: '100%', margin: 0 }} />

    </div>
  )
}

const objectShape = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string
})

SelectionsPresenter.propTypes = {
  value: PropTypes.oneOfType([
    objectShape,
    PropTypes.arrayOf(objectShape)
  ]),
  selectionsRenderer: PropTypes.func,
  hintText: PropTypes.string
}

// noinspection JSUnusedGlobalSymbols
SelectionsPresenter.defaultProps = {
  hintText: 'Click me',
  value: null,
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

// ================================================================
// ========================  SelectField  =========================
// ================================================================

class SelectField extends Component {
  constructor (props, context) {
    super(props, context)
    const itemsLength = this.getChildrenLength(this.props.children)
    this.state = {
      isOpen: false,
      itemsLength,
      showAutocomplete: itemsLength > this.props.showAutocompleteTreshold,
      selectedItems: props.value,
      searchText: ''
    }
    this.menuItems = []
  }

  componentWillReceiveProps (nextProps) {
    if (!areEqual(nextProps.value, this.state.selectedItems)) {
      this.setState({ selectedItems: nextProps.value })
    }
  }
  // Counts nodes with non-null value property + optgroups
  // noinspection JSMethodCanBeStatic
  getChildrenLength (children) {
    if (!children) return 0
    else if (Array.isArray(children)) {
      return children.reduce((count, child) => {
        if (child.type === 'optgroup') {
          ++count
          for (let c of child.props.children) {
            if (c.props.value) ++count
          }
        } else if (child.props.value) ++count
        return count
      }, 0)
    } else if (typeof children === 'object') {
      if (children.type === 'optgroup') {
        return this.getChildrenLength(children.props.children) + 1
      }
      else if (children.props.value) return 1
    }
    return 0
  }

  closeMenu = () => {
    const { onChange, name } = this.props
    onChange(this.state.selectedItems, name)
    this.setState({ isOpen: false, searchText: '' }, () => findDOMNode(this.root).focus())
  }

  openMenu () {
    if (this.state.itemsLength) this.setState({ isOpen: true }, () => this.focusTextField())
  }

  focusTextField () {
    if (this.state.showAutocomplete) {
      const input = findDOMNode(this.searchTextField).getElementsByTagName('input')[0]
      input.focus()
    } else this.focusMenuItem()
  }

  focusMenuItem (index) {
    const targetMenuItem = this.menuItems.find(item => {
      return !!item && (index ? item.props.tabIndex === index : true)
    })

    if (!targetMenuItem) throw Error('targetMenuItem not found.')
    targetMenuItem.applyFocusState('keyboard-focused')
  }

  clearTextField (callback) {
    this.setState({ searchText: '' }, callback)
  }

  /**
   * Main Component Wrapper methods
   */
  // toggle instead of close ? (in case user changes  targetOrigin/anchorOrigin)
  handleClick = (event) => !this.props.disabled && this.openMenu()

  handleKeyDown = (event) =>
    !this.props.disabled && /ArrowDown|Enter/.test(event.key) && this.openMenu()

  /**
   * Popover methods
   */
  // toggle instead of close ? (in case user changes targetOrigin/anchorOrigin)
  handlePopoverClose = (reason) => this.closeMenu()

  /**
   * TextField autocomplete methods
   */
  handleTextFieldAutocompletionFiltering = (event, searchText) => {
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
      this.setState({ selectedItems: updatedValues })
      this.clearTextField(() => this.focusTextField())
    } else {
      const updatedValue = areEqual(selectedItems, selectedItem) ? null : selectedItem
      this.setState({ selectedItems: updatedValue }, () => this.closeMenu())
    }
  }

  // TODO: add Shift+Tab
  /**
   * this.menuItems can contain uncontinuous React elements, because of filtering
   */
  handleMenuKeyDown = ({ key, target: {tabIndex} }) => {
    const cleanMenuItems = this.menuItems.filter(item => !!item)
    const firstTabIndex = cleanMenuItems[0].props.tabIndex
    const lastTabIndex = cleanMenuItems[ cleanMenuItems.length - 1 ].props.tabIndex
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

  render () {
    const { children, hintText, hintTextAutocomplete, noMatchFound, multiple, disabled, nb2show,
      autocompleteFilter, selectionsRenderer, menuCloseButton, anchorOrigin,
      style, menuStyle, elementHeight, innerDivStyle, selectedMenuItemStyle, menuGroupStyle, menuFooterStyle,
      checkedIcon, unCheckedIcon, hoverColor, checkPosition
    } = this.props

    const { baseTheme: {palette}, menuItem } = this.context.muiTheme

    // Default style depending on Material-UI context
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
      return [ ...nodes, (
        <ListItem
          key={++index}
          tabIndex={index}
          ref={ref => (this.menuItems[++index] = ref)}
          onTouchTap={this.handleMenuSelection({ value: childValue, label })}
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

    let fixedChildren
    switch (this.state.itemsLength) {
      case 0:
        fixedChildren = false
        break
      case 1:
        fixedChildren = [ children ]
        break
      default:
        // accounts for case with 1 single optgroup hosting many options
        fixedChildren = Array.isArray(children) ? children : [children]
    }

    const menuItems = !disabled && fixedChildren && this.state.isOpen &&
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
        const groupedItems = Array.isArray(child.props.children)
          ? child.props.children.reduce((nodes, child, idx) =>
              menuItemBuilder(nodes, child, nextIndex + idx), [])
          : menuItemBuilder(nodes, child, nextIndex)
        return groupedItems.length
          ? [ ...nodes, menuGroup, ...groupedItems ]
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
      : elementHeight * (nb2show < menuItems.length ? nb2show : menuItems.length)
    ) || 0
    const popoverHeight = autoCompleteHeight + (containerHeight || noMatchFoundHeight) + footerHeight
    const scrollableStyle = { overflowY: nb2show >= menuItems.length ? 'hidden' : 'scroll' }
    const menuWidth = this.root ? this.root.clientWidth : null

    return (
      <div
        ref={ref => (this.root = ref)}
        tabIndex='0'
        onKeyDown={this.handleKeyDown}
        onTouchTap={this.handleClick}
        title={!this.state.itemsLength ? 'Nothing to show' : ''}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          color: disabled ? palette.disabledColor : palette.textColor,
          ...style
        }}
      >

        <SelectionsPresenter
          hintText={hintText}
          selectedValues={this.state.selectedItems}
          selectionsRenderer={selectionsRenderer}
        />

        <Popover
          open={this.state.isOpen}
          anchorEl={this.root}
          canAutoPosition={false}
          anchorOrigin={anchorOrigin}
          useLayerForClickAway={false}
          onRequestClose={this.handlePopoverClose}
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
              : <ListItem primaryText={noMatchFound} style={{ cursor: 'default', padding: '10px 16px' }} disabled />
            }
          </div>
          {multiple &&
            <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div onTouchTap={this.closeMenu} style={menuFooterStyle}>
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

SelectField.propTypes = {
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'right'])
  }),
  style: PropTypes.object,
  menuStyle: PropTypes.object,
  menuGroupStyle: PropTypes.object,
  checkPosition: PropTypes.oneOf([ '', 'left', 'right' ]),
  checkedIcon: PropTypes.node,
  unCheckedIcon: PropTypes.node,
  hoverColor: PropTypes.string,
  // children can be any html element but with a required 'value' property
  children: PropTypes.arrayOf((props, propName, componentName, location, propFullName) => {
    if (props[propName].type !== 'optgroup') {
      if (!props[propName].props.value) {
        return new Error(`
          Missing required property 'value' for '${propFullName}' supplied to '${componentName}'. 
          Validation failed.`
        )
      }
    } else {
      for (let child of props[propName].props.children) {
        if (!child.props.value) {
          return new Error(`
            Missing required property 'value' for '${propFullName}' supplied to '${componentName}'. 
            Validation failed.`
          )
        }
      }
    }
  }),
  innerDivStyle: PropTypes.object,
  selectedMenuItemStyle: PropTypes.object,
  menuFooterStyle: PropTypes.object,
  name: PropTypes.string,
  hintText: PropTypes.string,
  hintTextAutocomplete: PropTypes.string,
  noMatchFound: PropTypes.string,
  showAutocompleteTreshold: PropTypes.number,
  elementHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  nb2show: PropTypes.number,
  value: (props, propName, componentName, location, propFullName) => {
    const { multiple, value } = props
    if (multiple) {
      if (!Array.isArray(value)) {
        return new Error(`
          When using 'multiple' mode, 'value' of '${componentName}' must be an array. 
          Validation failed.`
        )
      } else if (checkFormat(value) !== -1) {
        const index = checkFormat(value)
        return new Error(`
          'value[${index}]' of '${componentName}' must be an object including a 'value' property. 
          Validation failed.`
        )
      }
    } else if (value !== null && (typeof value !== 'object' || !('value' in value))) {
      return new Error(`
        'value' of '${componentName}' must be an object including a 'value' property. 
        Validation failed.`
      )
    }
  },
  autocompleteFilter: PropTypes.func,
  selectionsRenderer: PropTypes.func,
  menuCloseButton: PropTypes.node,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}

// noinspection JSUnusedGlobalSymbols
SelectField.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  checkPosition: '',
  checkedIcon: <CheckedIcon style={{ top: 'calc(50% - 12px)' }} />,
  unCheckedIcon: <UnCheckedIcon style={{ top: 'calc(50% - 12px)' }} />,
  menuCloseButton: null,
  multiple: false,
  disabled: false,
  nb2show: 5,
  hintText: 'Click me',
  hintTextAutocomplete: 'Type something',
  noMatchFound: 'No match found',
  showAutocompleteTreshold: 10,
  elementHeight: 36,
  autocompleteFilter: (searchText, text) => {
    if (!text || (typeof text !== 'string' && typeof text !== 'number')) return false
    if (typeof searchText !== 'string' && typeof searchText !== 'number') return false
    return (text + '').toLowerCase().includes(searchText.toLowerCase())
  },
  value: null,
  onChange: () => {},
  children: []
}

export default SelectField
/**
 * Created by Raphaël on 17/02/2017.
 */
