import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Popover from 'material-ui/Popover/Popover'
import TextField from 'material-ui/TextField/TextField'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'

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

SelectionsPresenter.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  selectionsRenderer: PropTypes.func,
  hintText: PropTypes.string
}

// noinspection JSUnusedGlobalSymbols
SelectionsPresenter.defaultProps = {
  hintText: 'Click me',
  // eslint-disable-next-line no-unused-vars
  selectionsRenderer: (value, hintText) => value.length
    ? typeof value === 'string' ? value : value.join(', ')
    : hintText
}

// ================================================================
// ========================  SelectField  =========================
// ================================================================

class SelectField extends Component {
  componentWillMount () {
    this.setState({ isOpen: false, searchText: '' })
  }

  // for debugging/styling purposes, set this to null
  // to disable list autoclosing on clickAway
  closeMenu () {
    this.setState({ isOpen: false, searchText: '' }, () => {
      findDOMNode(this.root).focus()
    })
  }

  openMenu () {
    this.setState({ isOpen: true }, () => {
      this.focusTextField()
    })
  }

  clearTextField (callback) {
    this.setState({ searchText: '' }, callback)
  }

  focusTextField () {
    if (this.props.children.length > 10) {
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
  handleMenuSelection = (event, selectedMenuItem) => {
    const { multiple, onSelect, name } = this.props
    onSelect(selectedMenuItem, name)
    multiple
      ? this.clearTextField(() => this.focusTextField())
      : this.closeMenu()
  }

  handleMenuEscKeyDown = () => this.closeMenu()

  handleMenuKeyDown= (event) => {
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
    const { value, hintText, multiple, children, style, menuProps,
      autocompleteFilter, selectionsRenderer } = this.props
    const menuItems = this.state.isOpen && children &&
      children.reduce((nodes, child, index) => {
        if (!autocompleteFilter(this.state.searchText, child.props.label)) return nodes
        const isSelected = value.includes(child.props.value)
        return [ ...nodes, (
          <MenuItem
            key={index}
            tabIndex={index}
            value={child.props.value}
            checked={multiple && isSelected}
            leftIcon={(multiple && !isSelected) ? <UnCheckedIcon /> : null}
            primaryText={child}
            disableFocusRipple
            innerDivStyle={{ paddingTop: 5, paddingBottom: 5 }}
          />)]
      }, [])

    // TODO: set autoWidth to false automatically if width prop has a value
    const menuWidth = this.root ? this.root.clientWidth : null

    // TODO: check rendering performance with 200 MenuItems (integrate react-virtualized ?)

    // TODO: add props.disableAutoComplete (default: false)

    // TODO: implement a checkboxRenderer for MenuItem (or expose 2 properties CheckIconFalse & CheckIconTrue)

    // TODO: make SelectionsPresenter appears only if current numMenuItems > this.maxMenuItems

    // TODO: add a css rule for this.root :focus { outline: 'none' }, and :hover { darken }

    return (
      <div
        ref={ref => (this.root = ref)}
        tabIndex='0'
        style={{ cursor: 'pointer', // eslint-disable-line object-property-newline
          // border: '1px dashed red', borderBottom: 'none', // eslint-disable-line object-property-newline
          ...style }} // eslint-disable-line object-property-newline
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
        >
          {children.length > 10 &&
            <TextField
              name='autoComplete'
              ref={ref => (this.searchTextField = ref)}
              value={this.state.searchText}
              hintText={hintText}
              onChange={this.handleTextFieldAutocompletionFiltering}
              onKeyDown={this.handleTextFieldKeyDown}
              style={{ marginLeft: 16, width: menuWidth - 16 * 2 }}
            />
          }
          <Menu
            ref={ref => (this.menu = ref)}
            {...menuProps}
            value={value}
            multiple={multiple}
            initiallyKeyboardFocused
            onChange={this.handleMenuSelection}
            onEscKeyDown={this.handleMenuEscKeyDown}
            onKeyDown={this.handleMenuKeyDown}
            desktop
            autoWidth={false}
            width={menuWidth}
          >
            {menuItems.length
              ? menuItems
              : <MenuItem primaryText='No match found' disabled />
            }
          </Menu>
        </Popover>

      </div>
    )
  }
}

SelectField.propTypes = {
  style: PropTypes.object,
  menuProps: PropTypes.object,
  children: PropTypes.any,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  autocompleteFilter: PropTypes.func,
  selectionsRenderer: PropTypes.func,
  name: PropTypes.string,
  hintText: PropTypes.string,
  multiple: PropTypes.bool,
  onSelect: PropTypes.func
}

// noinspection JSUnusedGlobalSymbols
SelectField.defaultProps = {
  multiple: false,
  // eslint-disable-next-line no-unused-vars
  autocompleteFilter: (searchText, text) => !text || text.toLowerCase().includes(searchText.toLowerCase())
}

export default SelectField
