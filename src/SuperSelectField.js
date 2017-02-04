import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import InfiniteScroller from 'react-infinite'
import Popover from 'material-ui/Popover/Popover'
import TextField from 'material-ui/TextField/TextField'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'

// TODO: set autoWidth to false automatically if width prop has a value

// TODO: check rendering performance with 200 MenuItems (integrate react-infinite)

// TODO: add props.floatingLabelText

// TODO: implement the error container (absolute position below the focusedLine) + add props.errorStyle
// TODO: add props.required

// TODO: support of <optgroup/>

// TODO: add props.disableAutoComplete (default: false), or a nbItems2showAutocomplete (default: null, meaning never show the searchTextField)

// TODO: implement a checkboxRenderer for MenuItem (or expose 2 properties CheckIconFalse & CheckIconTrue)
// TODO: make a PR reimplementing MenuItem.insetChildren replaced with checkPosition={'left'(default) or 'right'}

// TODO: make SelectionsPresenter appears only if current numMenuItems > this.maxMenuItems

// TODO: add a css rule for this.root :focus { outline: 'none' }, and :hover { darken }

// Utilities
const areEqual = (val1, val2) => {
  if (typeof val1 !== typeof val2) return false
  else if (typeof val1 === 'string' || typeof val1 === 'number') return val1 === val2
  else if (typeof val1 === 'object') {
    const props1 = Object.keys(val1)
    const props2 = Object.keys(val2)
    const values1 = Object.values(val1)
    const values2 = Object.values(val2)
    return props1.length === props2.length &&
      props1.every(key => props2.includes(key)) &&
      values1.every(val => values2.includes(val))
  }
}

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

const SelectionsPresenter = ({ value, hintText, selectionsRenderer }) => {
  // TODO: add floatingLabelText
  return (
    <div style={styles.div1}>

      <div style={styles.div2}>
        <div style={styles.div3}>
          {selectionsRenderer(value, hintText)}
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
  value: { value: '' },
  selectionsRenderer: (value, hintText) => {
    if (Array.isArray(value)) {
      return value.map(({ value, label }) => label || value).join(', ')
    }
    else if (value.label || value.value) return value.label || value.value
    else return hintText
  }
}

// ================================================================
// ========================  SelectField  =========================
// ================================================================

class SelectField extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isOpen: false,
      itemsLength: this.getChildrenLength(props.children),
      searchText: ''
    }
  }

  // Counts nodes with non-null value property + optgroups
  // noinspection JSMethodCanBeStatic
  getChildrenLength (children) {
    let count = 0
    for (let child of children) {
      if (child.type === 'optgroup') {
        ++count
        for (let c of child.props.children) {
          if (c.props.value) ++count
        }
      }
      else if (child.props.value) ++count
    }
    return count
  }

  closeMenu () {
    this.setState({ isOpen: false, searchText: '' }, () => findDOMNode(this.root).focus())
  }

  openMenu () {
    this.setState({ isOpen: true }, () => this.focusTextField())
  }

  clearTextField (callback) {
    this.setState({ searchText: '' }, callback)
  }

  focusTextField () {
    if (this.state.itemsLength > 10) {
      const input = findDOMNode(this.searchTextField).getElementsByTagName('input')[0]
      input.focus()
    }
  }

  focusFirstMenuItem () {
    const firstMenuItem = findDOMNode(this.menu).querySelector('[tabindex="0"]')
    firstMenuItem.focus()
  }

  focusLastMenuItem () {
    const menuItems = findDOMNode(this.menu).querySelectorAll('[tabindex]')
    const lastMenuItem = menuItems[menuItems.length - 1]
    lastMenuItem.focus()
  }

  /**
   * Main Component Wrapper methods
   */
  handleClick = () => {
    this.openMenu() // toggle instead of close ? (in case user changes  targetOrigin/anchorOrigin)
  }

  handleKeyDown = (event) => {
    if (/ArrowDown|Enter/.test(event.key)) this.openMenu()
  }

  /**
   * Popover methods
   */
  handlePopoverClose = (reason) => {
    this.closeMenu() // toggle instead of close ? (in case user changes targetOrigin/anchorOrigin)
  }

  /**
   * SelectionPresenter methods
   */
  handleTextFieldAutocompletionFiltering = (event, searchText) => {
    this.setState({ searchText }, () => this.focusTextField())
  }

  handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        this.focusFirstMenuItem()
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
    const { value, multiple, onChange, name } = this.props
    if (multiple) {
      console.debug('value', value)
      const selectedItemExists = value.some(obj => areEqual(obj.value, selectedItem.value))
      const updatedValues = selectedItemExists
        ? value.filter(obj => !areEqual(obj.value, selectedItem.value))
        : value.concat(selectedItem)
      onChange(updatedValues, name)
      this.clearTextField(() => this.focusTextField())
    } else {
      onChange(selectedItem, name)
      this.closeMenu()
    }
  }

  handleMenuEscKeyDown = () => this.closeMenu()

  handleMenuKeyDown = (event) => {
    // TODO: this solution propagates and triggers double onKeyDown
    // if event.stopPropagation(), nothing works, so the correct trigger is the 2nd one
    switch (event.key) {
      case 'ArrowUp':
        // TODO: add Shift+Tab
        // TODO: add if current MenuItem === firstChild
        this.focusTextField()
        break

      case 'ArrowDown':
        // TODO: if current MenuItem === lastChild, this.focusFirstMenuItem()
        break

      case 'PageUp':
        // TODO: this.focusFirstMenuItem()
        break

      case 'PageDown':
        // TODO: this.focusLastMenuItem()
        this.focusLastMenuItem()
        break

      default: break
    }
  }

  render () {
    const { value, hintText, multiple, children, nb2show,
      showAutocompleteTreshold, autocompleteFilter, selectionsRenderer,
      style, menuStyle, elementHeight, innerDivStyle, selectedMenuItemStyle, menuGroupStyle } = this.props

    // Default style depending on Material-UI context
    const mergedSelectedMenuItemStyle = {
      color: this.context.muiTheme.menuItem.selectedTextColor, ...selectedMenuItemStyle
    }

    /**
     * MenuItems building, based on user's children
     * 1st unction is the base process for producing a MenuItem,
     * including filtering from the Autocomplete.
     * 2nd function is the main loop over children array,
     * accounting for optgroups.
     */
    const menuItemBuilder = (nodes, child, index, groupIndex = '') => {
      const { value: childValue, label } = child.props
      if (!autocompleteFilter(this.state.searchText, label || childValue)) return nodes
      const isSelected = Array.isArray(value)
        ? value.some(obj => areEqual(obj.value, childValue))
        : value.value === childValue
      return [ ...nodes, (
        <MenuItem
          key={groupIndex + index}
          tabIndex={index}
          checked={multiple && isSelected}
          leftIcon={(multiple && !isSelected) ? <UnCheckedIcon /> : null}
          primaryText={child}
          disableFocusRipple
          innerDivStyle={{ paddingTop: 5, paddingBottom: 5, ...innerDivStyle }}
          style={isSelected ? mergedSelectedMenuItemStyle : null}
          onTouchTap={this.handleMenuSelection({ value: childValue, label })}
        />)]
    }
    const menuItems = this.state.isOpen && children &&
      children.reduce((nodes, child, index) => {
        if (child.type !== 'optgroup') return menuItemBuilder(nodes, child, index)

        const menuGroup =
          <MenuItem
            disabled
            key={`group${index}`}
            primaryText={child.props.label}
            style={{ cursor: 'default', ...menuGroupStyle }}
          />
        const groupedItems = child.props.children.reduce((nodes, child, idx) => menuItemBuilder(nodes, child, idx, `group${index}`), [])
        return [ ...nodes, menuGroup, ...groupedItems ]
      }, [])

    const containerHeight = elementHeight * (nb2show < menuItems.length ? nb2show : menuItems.length)
    const showAutocomplete = this.state.itemsLength > showAutocompleteTreshold
    const popoverHeight = (showAutocomplete ? 53 : 0) + (containerHeight || elementHeight)
    const scrollableStyle = { overflowY: nb2show >= menuItems.length ? 'hidden' : 'scroll' }
    const menuWidth = this.root ? this.root.clientWidth : null

    return (
      <div
        ref={ref => (this.root = ref)}
        tabIndex='0'
        style={{ cursor: 'pointer', ...style }}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
      >

        <SelectionsPresenter
          hintText={hintText}
          value={value}
          selectionsRenderer={selectionsRenderer}
        />

        <Popover
          open={this.state.isOpen}
          anchorEl={this.root}
          canAutoPosition={false}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          useLayerForClickAway={false}
          onRequestClose={this.handlePopoverClose}
          style={{ height: popoverHeight || 0 }}
        >
          {showAutocomplete &&
            <TextField
              name='autoComplete'
              ref={ref => (this.searchTextField = ref)}
              value={this.state.searchText}
              hintText={hintText}
              onChange={this.handleTextFieldAutocompletionFiltering}
              onKeyDown={this.handleTextFieldKeyDown}
              style={{ marginLeft: 16, marginBottom: 5, width: menuWidth - 16 * 2 }}
            />
          }
          <div
            ref={ref => (this.menu = ref)}
            style={{ width: menuWidth, ...menuStyle }}
          >
            {menuItems.length
              ? <InfiniteScroller
                  containerHeight={containerHeight || 0}
                  elementHeight={elementHeight}
                  styles={{ scrollableStyle }}
                >
                  {menuItems}
                </InfiniteScroller>
              : <MenuItem primaryText='No match found' style={{ cursor: 'default' }} disabled />
            }
          </div>
        </Popover>

      </div>
    )
  }
}

SelectField.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}

SelectField.propTypes = {
  style: PropTypes.object,
  menuStyle: PropTypes.object,
  menuGroupStyle: PropTypes.object,
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
  name: PropTypes.string,
  hintText: PropTypes.string,
  showAutocompleteTreshold: PropTypes.number,
  elementHeight: PropTypes.number,
  nb2show: PropTypes.number,
  value: PropTypes.oneOfType([
    objectShape,
    PropTypes.arrayOf(objectShape)
  ]),
  autocompleteFilter: PropTypes.func,
  selectionsRenderer: PropTypes.func,
  multiple: PropTypes.bool,
  onChange: PropTypes.func
}

// noinspection JSUnusedGlobalSymbols
SelectField.defaultProps = {
  multiple: false,
  nb2show: 5,
  showAutocompleteTreshold: 10,
  elementHeight: 58,
  autocompleteFilter: (searchText, text) => !text || (text + '').toLowerCase().includes(searchText.toLowerCase())
}

export default SelectField
