import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import InfiniteScroller from 'react-infinite'
import Popover from 'material-ui/Popover/Popover'
import TextField from 'material-ui/TextField/TextField'
import ListItem from 'material-ui/List/ListItem'
import CheckedIcon from 'material-ui/svg-icons/navigation/check'
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'

// ================================================================
// =========================  Utilities  ==========================
// ================================================================

function entries (obj) {
  return 'entries' in Object
    ? Object.entries(obj)
    : Object.keys(obj).map(prop => [ prop, obj[prop] ])
}

function areEqual (val1, val2) {
  if ((val1 === 0 || val2 === 0) && val1 === val2) return true
  else if (!val1 || !val2 || typeof val1 !== typeof val2) return false
  else if (typeof val1 === 'string' ||
    typeof val1 === 'number' ||
    typeof val1 === 'boolean') return val1 === val2
  else if (typeof val1 === 'object') {
    return Object.keys(val1).length === Object.keys(val2).length &&
      entries(val2).every(([key2, value2]) => val1[key2] === value2)
  }
}

const checkFormat = value => value.findIndex(v => typeof v !== 'object' || !('value' in v))

const objectShape = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string
})

// ================================================================
// =======================  FloatingLabel  ========================
// ================================================================

// TODO: implement style lock when disabled = true
class FloatingLabel extends Component {
  state = { flabelHeight: 0 }

  componentDidMount () {
    this.setState({ flabelHeight: this.flabel.offsetHeight })
  }

  render () {
    const {
      children, shrink, focusCondition, /* disabled, */
      defaultColors: {floatingLabelColor, focusColor},
      floatingLabelStyle, floatingLabelFocusStyle
    } = this.props
    const defaultStyles = {
      position: 'static',
      top: 0,
      lineHeight: '22px',
      zIndex: 1, // Needed to display label above Chrome's autocomplete field background
      transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
      transform: 'scale(1) translateY(0)',
      transformOrigin: 'left top',
      pointerEvents: 'auto',
      userSelect: 'none',
      color: floatingLabelColor,
      ...floatingLabelStyle
    }

    const focusStyles = focusCondition &&
      {
        color: focusColor,
        ...floatingLabelFocusStyle
      }

    const shrinkStyles = shrink &&
      {
        position: 'absolute',
        transform: `scale(0.75) translateY(-${this.state.flabelHeight}px)`,
        pointerEvents: 'none'
      }

    return (
      <label ref={ref => (this.flabel = ref)} style={{ ...defaultStyles, ...shrinkStyles, ...focusStyles }}>
        {children}
      </label>
    )
  }
}

FloatingLabel.defaultProps = {
  disabled: false,
  shrink: false
}

// ================================================================
// ====================  SelectionsPresenter  =====================
// ================================================================

// noinspection JSDuplicatedDeclaration
const styles = {
  div1: {
    position: 'relative',
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
  div2: {
    WebkitBoxFlex: 1,
    MozBoxFlex: 1,
    WebkitFlex: 1,
    msFlex: 1,
    OFlex: 1,
    flex: 1
  }
}

const SelectionsPresenter = ({
  selectedValues, selectionsRenderer,
  floatingLabel, hintText,
  muiTheme, floatingLabelStyle, floatingLabelFocusStyle,
  underlineStyle, underlineFocusStyle,
  isFocused, isOpen, disabled
}) => {
  const { textField: {floatingLabelColor, borderColor, focusColor} } = muiTheme

  // Condition for animating floating Label color and underline
  const focusCondition = isFocused || isOpen
  // Condition for shrinking the floating Label
  const shrinkCondition = (Array.isArray(selectedValues) && !!selectedValues.length) ||
    (!Array.isArray(selectedValues) && typeof selectedValues === 'object') ||
    focusCondition

  const baseHRstyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    margin: 0,
    boxSizing: 'content-box',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid',
    borderColor,
    ...underlineStyle
  }

  const focusedHRstyle = {
    borderBottom: '2px solid',
    borderColor: (isFocused || isOpen) ? focusColor : borderColor,
    transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
    transform: `scaleX( ${(isFocused || isOpen) ? 1 : 0} )`,
    ...underlineFocusStyle
  }

  return (
    <div style={styles.div1}>
      <div style={styles.div2}>
        {floatingLabel &&
          <FloatingLabel
            shrink={shrinkCondition}
            focusCondition={focusCondition}
            disabled={disabled}
            defaultColors={{floatingLabelColor, focusColor}}
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelFocusStyle={floatingLabelFocusStyle}
          >
            {floatingLabel}
          </FloatingLabel>
        }
        {(shrinkCondition || !floatingLabel) &&
          selectionsRenderer(selectedValues, hintText)
        }
      </div>
      <DropDownArrow style={{fill: borderColor}} />

      <hr style={baseHRstyle} />
      <hr style={{ ...baseHRstyle, ...focusedHRstyle }} />
    </div>)
}

SelectionsPresenter.propTypes = {
  value: PropTypes.oneOfType([
    objectShape,
    PropTypes.arrayOf(objectShape)
  ]),
  selectionsRenderer: PropTypes.func,
  hintText: PropTypes.string
}

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
    const { children, value, multiple, showAutocompleteThreshold } = props
    const itemsLength = this.getChildrenLength(children)
    this.state = {
      isOpen: false,
      isFocused: false,
      itemsLength,
      showAutocomplete: (itemsLength > showAutocompleteThreshold) || false,
      selectedItems: value || (multiple ? [] : null),
      searchText: ''
    }
    this.menuItems = []
  }

  componentWillReceiveProps (nextProps) {
    if (!areEqual(nextProps.value, this.state.selectedItems)) {
      this.setState({ selectedItems: nextProps.value })
    }
    if (!areEqual(nextProps.children, this.props.children)) {
      const itemsLength = this.getChildrenLength(nextProps.children)
      this.setState({
        itemsLength,
        showAutocomplete: itemsLength > this.props.showAutocompleteThreshold
      })
    }
  }

  // Counts nodes with non-null value property without optgroups
  // noinspection JSMethodCanBeStatic
  getChildrenLength (children) {
    if (!children) return 0
    else if (Array.isArray(children) && children.length) {
      return children.reduce((count, { type, props: {value, children: cpc} }) => {
        if (type === 'optgroup') {
          if (cpc) {
            if (Array.isArray(cpc)) {
              for (let c of cpc) {
                if (c.props.value) ++count
              }
            } else if (typeof cpc === 'object' && cpc.props.value) ++count
          }
        } else if (value) ++count
        return count
      }, 0)
    } else if (!Array.isArray(children) && typeof children === 'object') {
      if (children.type === 'optgroup') return this.getChildrenLength(children.props.children)
      else if (children.props.value) return 1
    }
    return 0
  }

  onFocus = () => this.setState({ isFocused: true })

  onBlur = (event) => {
    if (!this.state.isOpen) this.setState({ isFocused: false })
  }

  closeMenu = (reason) => {
    const { onChange, name } = this.props
    onChange(this.state.selectedItems, name)
    if (reason) this.setState({ isFocused: false }) // if reason === 'clickaway' or 'offscreen'
    this.setState({ isOpen: false, searchText: '' }, () => !reason && this.root.focus())
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
    const { children, floatingLabel, hintText, hintTextAutocomplete, noMatchFound, multiple, disabled, nb2show,
      autocompleteFilter, selectionsRenderer, menuCloseButton, anchorOrigin,
      style, menuStyle, elementHeight, innerDivStyle, selectedMenuItemStyle, menuGroupStyle, menuFooterStyle,
      floatingLabelStyle, floatingLabelFocusStyle, underlineStyle, underlineFocusStyle,
      autocompleteUnderlineStyle, autocompleteUnderlineFocusStyle,
      checkedIcon, unCheckedIcon, hoverColor, checkPosition
    } = this.props

    // Default style depending on Material-UI context (muiTheme)
    const { baseTheme: {palette}, menuItem } = this.context.muiTheme

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
          } else if (typeof cpc === 'object') groupedItems = menuItemBuilder(nodes, cpc, nextIndex)
        }
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
        onFocus={this.onFocus}
        onBlur={this.onBlur}
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
          isFocused={this.state.isFocused}
          isOpen={this.state.isOpen}
          disabled={disabled}
          hintText={hintText}
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
          canAutoPosition={false}
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
  // children can be either:
  // an html element with a required 'value' property, and optional label prop,
  // an optgroup with valid children (same as bove case),
  // an array of either valid chidlren, or of optgroups hosting valid children
  children: PropTypes.oneOfType([
    objectShape,
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
        } else if (typeof pp.props.children === 'object' && !pp.props.children.props.value) {
          return new Error(`
          Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.
          Validation failed.`
          )
        }
      }
    },
    PropTypes.arrayOf((props, propName, componentName, location, propFullName) => {
      if (props[propName].type !== 'optgroup') {
        if (!props[propName].props.value) {
          return new Error(`
          Missing required property 'value' for '${propFullName}' supplied to '${componentName} ${props.name}'.
          Validation failed.`
          )
        }
      } else {
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
  innerDivStyle: PropTypes.object,
  selectedMenuItemStyle: PropTypes.object,
  menuFooterStyle: PropTypes.object,
  name: PropTypes.string,
  floatingLabel: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  floatingLabelFocusStyle: PropTypes.object,
  underlineStyle: PropTypes.object,
  underlineFocusStyle: PropTypes.object,
  autocompleteUnderlineStyle: PropTypes.object,
  autocompleteUnderlineFocusStyle: PropTypes.object,
  hintText: PropTypes.string,
  hintTextAutocomplete: PropTypes.string,
  noMatchFound: PropTypes.string,
  showAutocompleteThreshold: PropTypes.number,
  elementHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  nb2show: PropTypes.number,
  value: (props, propName, componentName, location, propFullName) => {
    const { multiple, value } = props
    // console.debug(`value ${props.name}`, value)
    if (multiple) {
      if (!Array.isArray(value)) {
        return new Error(`
          When using 'multiple' mode, 'value' of '${componentName} ${props.name}' must be an array.
          Validation failed.`
        )
      } else if (checkFormat(value) !== -1) {
        const index = checkFormat(value)
        return new Error(`
          'value[${index}]' of '${componentName} ${props.name}' must be an object including a 'value' property.
          Validation failed.`
        )
      }
    } else if (value !== null && (typeof value !== 'object' || !('value' in value))) {
      return new Error(`
        'value' of '${componentName} ${props.name}' must be an object including a 'value' property.
        Validation failed.`
      )
    }
  },
  autocompleteFilter: PropTypes.func,
  selectionsRenderer: PropTypes.func,
  menuCloseButton: PropTypes.node,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onAutoCompleteTyping: PropTypes.func
}

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
  showAutocompleteThreshold: 10,
  elementHeight: 36,
  autocompleteFilter: (searchText, text) => {
    if (!text || (typeof text !== 'string' && typeof text !== 'number')) return false
    if (typeof searchText !== 'string' && typeof searchText !== 'number') return false
    return (text + '').toLowerCase().includes(searchText.toLowerCase())
  },
  value: null,
  onChange: () => {},
  onAutoCompleteTyping: () => {},
  children: []
}

export default SelectField
/**
 * Created by Raphaël on 17/02/2017.
 */
