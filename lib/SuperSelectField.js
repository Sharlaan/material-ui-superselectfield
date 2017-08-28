'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _div;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactInfinite = require('react-infinite');

var _reactInfinite2 = _interopRequireDefault(_reactInfinite);

var _Popover = require('material-ui/Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _TextField = require('material-ui/TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _ListItem = require('material-ui/List/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _check = require('material-ui/svg-icons/navigation/check');

var _check2 = _interopRequireDefault(_check);

var _checkBoxOutlineBlank = require('material-ui/svg-icons/toggle/check-box-outline-blank');

var _checkBoxOutlineBlank2 = _interopRequireDefault(_checkBoxOutlineBlank);

var _arrowDropDown = require('material-ui/svg-icons/navigation/arrow-drop-down');

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ================================================================
// =========================  Utilities  ==========================
// ================================================================

function entries(obj) {
  return 'entries' in Object ? (0, _entries2.default)(obj) : Object.keys(obj).map(function (prop) {
    return [prop, obj[prop]];
  });
}

function areEqual(val1, val2) {
  if ((val1 === 0 || val2 === 0) && val1 === val2) return true;else if (!val1 || !val2 || (typeof val1 === 'undefined' ? 'undefined' : _typeof(val1)) !== (typeof val2 === 'undefined' ? 'undefined' : _typeof(val2))) return false;else if (typeof val1 === 'string' || typeof val1 === 'number' || typeof val1 === 'boolean') return val1 === val2;else if ((typeof val1 === 'undefined' ? 'undefined' : _typeof(val1)) === 'object') {
    return Object.keys(val1).length === Object.keys(val2).length && entries(val2).every(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key2 = _ref2[0],
          value2 = _ref2[1];

      return val1[key2] === value2;
    });
  }
}

function isPresent(value) {
  return value !== null && value !== undefined;
}

var checkFormat = function checkFormat(value) {
  return value.findIndex(function (v) {
    return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) !== 'object' || !('value' in v);
  });
};

var objectShape = _propTypes2.default.shape({
  value: _propTypes2.default.any.isRequired,
  label: _propTypes2.default.string
});

// ================================================================
// =======================  FloatingLabel  ========================
// ================================================================

// TODO: implement style lock when disabled = true

var FloatingLabel = function (_Component) {
  _inherits(FloatingLabel, _Component);

  function FloatingLabel() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, FloatingLabel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = FloatingLabel.__proto__ || Object.getPrototypeOf(FloatingLabel)).call.apply(_ref3, [this].concat(args))), _this), _this.state = { flabelHeight: 0 }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FloatingLabel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ flabelHeight: this.flabel.offsetHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          shrink = _props.shrink,
          focusCondition = _props.focusCondition,
          _props$defaultColors = _props.defaultColors,
          floatingLabelColor = _props$defaultColors.floatingLabelColor,
          focusColor = _props$defaultColors.focusColor,
          floatingLabelStyle = _props.floatingLabelStyle,
          floatingLabelFocusStyle = _props.floatingLabelFocusStyle;

      var defaultStyles = _extends({
        position: 'static',
        top: 0,
        lineHeight: '22px',
        zIndex: 1, // Needed to display label above Chrome's autocomplete field background
        transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
        transform: 'scale(1) translateY(0)',
        transformOrigin: 'left top',
        pointerEvents: 'auto',
        userSelect: 'none',
        color: floatingLabelColor
      }, floatingLabelStyle);

      var focusStyles = focusCondition && _extends({
        color: focusColor
      }, floatingLabelFocusStyle);

      var shrinkStyles = shrink && {
        position: 'absolute',
        transform: 'scale(0.75) translateY(-' + this.state.flabelHeight + 'px)',
        pointerEvents: 'none'
      };

      return _react2.default.createElement(
        'label',
        { ref: function ref(_ref4) {
            return _this2.flabel = _ref4;
          }, style: _extends({}, defaultStyles, shrinkStyles, focusStyles) },
        children
      );
    }
  }]);

  return FloatingLabel;
}(_react.Component);

FloatingLabel.defaultProps = {
  disabled: false,
  shrink: false
};

// ================================================================
// ====================  SelectionsPresenter  =====================
// ================================================================

// noinspection JSDuplicatedDeclaration
var styles = {
  div1: (_div = {
    position: 'relative',
    display: '-webkit-box'
  }, _defineProperty(_div, 'display', '-webkit-flex'), _defineProperty(_div, 'display', '-moz-box'), _defineProperty(_div, 'display', '-ms-flexbox'), _defineProperty(_div, 'display', '-o-flex'), _defineProperty(_div, 'display', 'flex'), _defineProperty(_div, 'WebkitBoxPack', 'end'), _defineProperty(_div, 'WebkitJustifyContent', 'flex-end'), _defineProperty(_div, 'msFlexPack', 'end'), _defineProperty(_div, 'OJustifyContent', 'flex-end'), _defineProperty(_div, 'justifyContent', 'flex-end'), _defineProperty(_div, 'WebkitAlignItems', 'center'), _defineProperty(_div, 'MozAlignItems', 'center'), _defineProperty(_div, 'msAlignItems', 'center'), _defineProperty(_div, 'OAlignItems', 'center'), _defineProperty(_div, 'alignItems', 'center'), _div),
  div2: {
    WebkitBoxFlex: 1,
    MozBoxFlex: 1,
    WebkitFlex: 1,
    msFlex: 1,
    OFlex: 1,
    flex: 1
  }
};

var SelectionsPresenter = function SelectionsPresenter(_ref5) {
  var selectedValues = _ref5.selectedValues,
      selectionsRenderer = _ref5.selectionsRenderer,
      floatingLabel = _ref5.floatingLabel,
      hintText = _ref5.hintText,
      muiTheme = _ref5.muiTheme,
      floatingLabelStyle = _ref5.floatingLabelStyle,
      floatingLabelFocusStyle = _ref5.floatingLabelFocusStyle,
      underlineStyle = _ref5.underlineStyle,
      underlineFocusStyle = _ref5.underlineFocusStyle,
      isFocused = _ref5.isFocused,
      isOpen = _ref5.isOpen,
      disabled = _ref5.disabled;
  var _muiTheme$textField = muiTheme.textField,
      floatingLabelColor = _muiTheme$textField.floatingLabelColor,
      borderColor = _muiTheme$textField.borderColor,
      focusColor = _muiTheme$textField.focusColor;

  // Condition for animating floating Label color and underline

  var focusCondition = isFocused || isOpen;
  // Condition for shrinking the floating Label
  var shrinkCondition = Array.isArray(selectedValues) && !!selectedValues.length || !Array.isArray(selectedValues) && (typeof selectedValues === 'undefined' ? 'undefined' : _typeof(selectedValues)) === 'object' || focusCondition;

  var baseHRstyle = _extends({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    margin: 0,
    boxSizing: 'content-box',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid',
    borderColor: borderColor
  }, underlineStyle);

  var focusedHRstyle = _extends({
    borderBottom: '2px solid',
    borderColor: isFocused || isOpen ? focusColor : borderColor,
    transition: '450ms cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
    transform: 'scaleX( ' + (isFocused || isOpen ? 1 : 0) + ' )'
  }, underlineFocusStyle);

  return _react2.default.createElement(
    'div',
    { style: styles.div1 },
    _react2.default.createElement(
      'div',
      { style: styles.div2 },
      floatingLabel && _react2.default.createElement(
        FloatingLabel,
        {
          shrink: shrinkCondition,
          focusCondition: focusCondition,
          disabled: disabled,
          defaultColors: { floatingLabelColor: floatingLabelColor, focusColor: focusColor },
          floatingLabelStyle: floatingLabelStyle,
          floatingLabelFocusStyle: floatingLabelFocusStyle
        },
        floatingLabel
      ),
      (shrinkCondition || !floatingLabel) && selectionsRenderer(selectedValues, hintText)
    ),
    _react2.default.createElement(_arrowDropDown2.default, { style: { fill: borderColor } }),
    _react2.default.createElement('hr', { style: baseHRstyle }),
    _react2.default.createElement('hr', { style: _extends({}, baseHRstyle, focusedHRstyle) })
  );
};

SelectionsPresenter.propTypes = {
  value: _propTypes2.default.oneOfType([objectShape, _propTypes2.default.arrayOf(objectShape)]),
  selectionsRenderer: _propTypes2.default.func,
  hintText: _propTypes2.default.string
};

SelectionsPresenter.defaultProps = {
  hintText: 'Click me',
  value: null,
  selectionsRenderer: function selectionsRenderer(values, hintText) {
    if (!values) return hintText;
    var value = values.value,
        label = values.label;

    if (Array.isArray(values)) {
      return values.length ? values.map(function (_ref6) {
        var value = _ref6.value,
            label = _ref6.label;
        return label || value;
      }).join(', ') : hintText;
    } else if (label || value) return label || value;else return hintText;
  }
};

// ================================================================
// ========================  SelectField  =========================
// ================================================================

var SelectField = function (_Component2) {
  _inherits(SelectField, _Component2);

  function SelectField(props, context) {
    _classCallCheck(this, SelectField);

    var _this3 = _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call(this, props, context));

    _initialiseProps.call(_this3);

    var children = props.children,
        value = props.value,
        multiple = props.multiple,
        showAutocompleteThreshold = props.showAutocompleteThreshold;

    var itemsLength = _this3.getChildrenLength(children);
    _this3.state = {
      isOpen: false,
      isFocused: false,
      itemsLength: itemsLength,
      showAutocomplete: itemsLength > showAutocompleteThreshold || false,
      selectedItems: value || (multiple ? [] : null),
      searchText: ''
    };
    _this3.menuItems = [];
    return _this3;
  }

  _createClass(SelectField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!areEqual(nextProps.value, this.state.selectedItems)) {
        this.setState({ selectedItems: nextProps.value });
      }
      if (!areEqual(nextProps.children, this.props.children)) {
        var itemsLength = this.getChildrenLength(nextProps.children);
        this.setState({
          itemsLength: itemsLength,
          showAutocomplete: itemsLength > this.props.showAutocompleteThreshold
        });
      }
    }

    // Counts nodes with non-null value property without optgroups
    // noinspection JSMethodCanBeStatic

  }, {
    key: 'getChildrenLength',
    value: function getChildrenLength(children) {
      if (!children) return 0;else if (Array.isArray(children) && children.length) {
        return children.reduce(function (count, _ref7) {
          var type = _ref7.type,
              _ref7$props = _ref7.props,
              value = _ref7$props.value,
              cpc = _ref7$props.children;

          if (type === 'optgroup') {
            if (cpc) {
              if (Array.isArray(cpc)) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = cpc[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var c = _step.value;

                    if (c.props.value) ++count;
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }
              } else if ((typeof cpc === 'undefined' ? 'undefined' : _typeof(cpc)) === 'object' && cpc.props.value) ++count;
            }
          } else if (value) ++count;
          return count;
        }, 0);
      } else if (!Array.isArray(children) && (typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object') {
        if (children.type === 'optgroup') return this.getChildrenLength(children.props.children);else if (children.props.value) return 1;
      }
      return 0;
    }
  }, {
    key: 'openMenu',
    value: function openMenu() {
      var _this4 = this;

      if (this.state.itemsLength) this.setState({ isOpen: true }, function () {
        return _this4.focusTextField();
      });
    }
  }, {
    key: 'focusTextField',
    value: function focusTextField() {
      if (this.state.showAutocomplete) {
        var input = (0, _reactDom.findDOMNode)(this.searchTextField).getElementsByTagName('input')[0];
        input.focus();
      } else this.focusMenuItem();
    }
  }, {
    key: 'focusMenuItem',
    value: function focusMenuItem(index) {
      var targetMenuItem = this.menuItems.find(function (item) {
        return !!item && (index ? item.props.tabIndex === index : true);
      });

      if (!targetMenuItem) throw Error('targetMenuItem not found.');
      targetMenuItem.applyFocusState('keyboard-focused');
    }
  }, {
    key: 'clearTextField',
    value: function clearTextField(callback) {
      this.setState({ searchText: '' }, callback);
    }

    /**
     * Main Component Wrapper methods
     */
    // toggle instead of close ? (in case user changes  targetOrigin/anchorOrigin)


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

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props2 = this.props,
          children = _props2.children,
          floatingLabel = _props2.floatingLabel,
          hintText = _props2.hintText,
          hintTextAutocomplete = _props2.hintTextAutocomplete,
          noMatchFound = _props2.noMatchFound,
          multiple = _props2.multiple,
          disabled = _props2.disabled,
          nb2show = _props2.nb2show,
          autocompleteFilter = _props2.autocompleteFilter,
          selectionsRenderer = _props2.selectionsRenderer,
          menuCloseButton = _props2.menuCloseButton,
          showSelectAll = _props2.showSelectAll,
          headerStyle = _props2.headerStyle,
          anchorOrigin = _props2.anchorOrigin,
          style = _props2.style,
          menuStyle = _props2.menuStyle,
          elementHeight = _props2.elementHeight,
          innerDivStyle = _props2.innerDivStyle,
          selectedMenuItemStyle = _props2.selectedMenuItemStyle,
          menuGroupStyle = _props2.menuGroupStyle,
          menuFooterStyle = _props2.menuFooterStyle,
          floatingLabelStyle = _props2.floatingLabelStyle,
          floatingLabelFocusStyle = _props2.floatingLabelFocusStyle,
          underlineStyle = _props2.underlineStyle,
          underlineFocusStyle = _props2.underlineFocusStyle,
          autocompleteUnderlineStyle = _props2.autocompleteUnderlineStyle,
          autocompleteUnderlineFocusStyle = _props2.autocompleteUnderlineFocusStyle,
          checkedIcon = _props2.checkedIcon,
          unCheckedIcon = _props2.unCheckedIcon,
          hoverColor = _props2.hoverColor,
          checkPosition = _props2.checkPosition,
          useLayerForClickAway = _props2.useLayerForClickAway;

      // Default style depending on Material-UI context (muiTheme)

      var _context$muiTheme = this.context.muiTheme,
          palette = _context$muiTheme.baseTheme.palette,
          menuItem = _context$muiTheme.menuItem;


      var mergedSelectedMenuItemStyle = _extends({
        color: menuItem.selectedTextColor }, selectedMenuItemStyle);
      if (checkedIcon) checkedIcon.props.style.fill = mergedSelectedMenuItemStyle.color;
      var mergedHoverColor = hoverColor || menuItem.hoverColor;

      /**
       * MenuItems building, based on user's children
       * 1st function is the base process for producing a MenuItem,
       * including filtering from the Autocomplete.
       * 2nd function is the main loop over children array,
       * accounting for optgroups.
       */
      var menuItemBuilder = function menuItemBuilder(nodes, child, index) {
        var selectedItems = _this5.state.selectedItems;
        var _child$props = child.props,
            childValue = _child$props.value,
            label = _child$props.label;

        if (!autocompleteFilter(_this5.state.searchText, label || childValue)) return nodes;
        var isSelected = Array.isArray(selectedItems) ? selectedItems.some(function (obj) {
          return areEqual(obj.value, childValue);
        }) : selectedItems ? selectedItems.value === childValue : false;
        var leftCheckbox = multiple && checkPosition === 'left' && (isSelected ? checkedIcon : unCheckedIcon) || null;
        var rightCheckbox = multiple && checkPosition === 'right' && (isSelected ? checkedIcon : unCheckedIcon) || null;
        if (multiple && checkPosition !== '') {
          if (checkedIcon) checkedIcon.props.style.marginTop = 0;
          if (unCheckedIcon) unCheckedIcon.props.style.marginTop = 0;
        }
        return [].concat(_toConsumableArray(nodes), [_react2.default.createElement(_ListItem2.default, {
          key: ++index,
          tabIndex: index,
          ref: function ref(_ref8) {
            return _this5.menuItems[++index] = _ref8;
          },
          onTouchTap: _this5.handleMenuSelection({ value: childValue, label: label }),
          disableFocusRipple: true,
          leftIcon: leftCheckbox,
          rightIcon: rightCheckbox,
          primaryText: child,
          hoverColor: mergedHoverColor,
          innerDivStyle: _extends({
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: multiple && checkPosition === 'left' ? 56 : 16,
            paddingRight: multiple && checkPosition === 'right' ? 56 : 16
          }, innerDivStyle),
          style: isSelected ? mergedSelectedMenuItemStyle : {}
        })]);
      };

      var fixedChildren = Array.isArray(children) ? children : [children];

      var menuItems = !disabled && fixedChildren.length && this.state.isOpen && fixedChildren.reduce(function (nodes, child, index) {
        if (child.type !== 'optgroup') return menuItemBuilder(nodes, child, index);
        var nextIndex = nodes.length ? +nodes[nodes.length - 1].key + 1 : 0;
        var menuGroup = _react2.default.createElement(_ListItem2.default, {
          disabled: true,
          key: nextIndex,
          primaryText: child.props.label,
          style: _extends({ cursor: 'default', paddingTop: 10, paddingBottom: 10 }, menuGroupStyle)
        });
        var groupedItems = [];
        var cpc = child.props.children;
        if (cpc) {
          if (Array.isArray(cpc) && cpc.length) {
            groupedItems = cpc.reduce(function (nodes, child, idx) {
              return menuItemBuilder(nodes, child, nextIndex + idx);
            }, []);
          } else if ((typeof cpc === 'undefined' ? 'undefined' : _typeof(cpc)) === 'object') groupedItems = menuItemBuilder(nodes, cpc, nextIndex);
        }
        return groupedItems.length ? [].concat(_toConsumableArray(nodes), [menuGroup], _toConsumableArray(groupedItems)) : nodes;
      }, []);

      /*
      const menuItemsHeights = this.state.isOpen
        ? this.menuItems.map(item => findDOMNode(item).clientHeight) // can't resolve since items not rendered yet, need componentDiDMount
        : elementHeight
      */
      var autoCompleteHeight = this.state.showAutocomplete ? 53 : 0;
      var headerHeight = showSelectAll ? 96 : 0;
      var footerHeight = menuCloseButton ? 36 : 0;
      var noMatchFoundHeight = 36;
      var containerHeight = (Array.isArray(elementHeight) ? elementHeight.reduce(function (totalHeight, height) {
        return totalHeight + height;
      }, 6) : elementHeight * (nb2show < menuItems.length ? nb2show : menuItems.length)) || 0;
      var popoverHeight = autoCompleteHeight + headerHeight + (containerHeight || noMatchFoundHeight) + footerHeight;
      var scrollableStyle = { overflowY: nb2show >= menuItems.length ? 'hidden' : 'scroll' };
      var menuWidth = this.root ? this.root.clientWidth : null;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref11) {
            return _this5.root = _ref11;
          },
          tabIndex: '0',
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyDown: this.handleKeyDown,
          onTouchTap: this.handleClick,
          title: !this.state.itemsLength ? 'Nothing to show' : '',
          style: _extends({
            cursor: disabled ? 'not-allowed' : 'pointer',
            color: disabled ? palette.disabledColor : palette.textColor
          }, style)
        },
        _react2.default.createElement(SelectionsPresenter, {
          isFocused: this.state.isFocused,
          isOpen: this.state.isOpen,
          disabled: disabled,
          hintText: hintText,
          muiTheme: this.context.muiTheme,
          selectedValues: this.state.selectedItems,
          selectionsRenderer: selectionsRenderer,
          floatingLabel: floatingLabel,
          floatingLabelStyle: floatingLabelStyle,
          floatingLabelFocusStyle: floatingLabelFocusStyle,
          underlineStyle: underlineStyle,
          underlineFocusStyle: underlineFocusStyle
        }),
        _react2.default.createElement(
          _Popover2.default,
          {
            open: this.state.isOpen,
            anchorEl: this.root,
            canAutoPosition: false,
            anchorOrigin: anchorOrigin,
            useLayerForClickAway: useLayerForClickAway,
            onRequestClose: this.closeMenu,
            style: { height: popoverHeight }
          },
          this.state.showAutocomplete && _react2.default.createElement(_TextField2.default, {
            ref: function ref(_ref9) {
              return _this5.searchTextField = _ref9;
            },
            value: this.state.searchText,
            hintText: hintTextAutocomplete,
            onChange: this.handleTextFieldAutocompletionFiltering,
            onKeyDown: this.handleTextFieldKeyDown,
            style: { marginLeft: 16, marginBottom: 5, width: menuWidth - 16 * 2 },
            underlineStyle: autocompleteUnderlineStyle,
            underlineFocusStyle: autocompleteUnderlineFocusStyle
          }),
          multiple && showSelectAll && _react2.default.createElement(
            'header',
            { style: _extends({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 16,
                marginBottom: 7,
                width: menuWidth - 16 * 2,
                borderBottom: '3px solid #999'
              }, headerStyle) },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _ListItem2.default,
                { onTouchTap: this.selectAll },
                'Select All'
              ),
              _react2.default.createElement(
                _ListItem2.default,
                { onTouchTap: this.clearSelection },
                'Clear Filter'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            {
              ref: function ref(_ref10) {
                return _this5.menu = _ref10;
              },
              onKeyDown: this.handleMenuKeyDown,
              style: _extends({ width: menuWidth }, menuStyle)
            },
            menuItems.length ? _react2.default.createElement(
              _reactInfinite2.default,
              {
                elementHeight: elementHeight,
                containerHeight: containerHeight,
                styles: { scrollableStyle: scrollableStyle }
              },
              menuItems
            ) : _react2.default.createElement(_ListItem2.default, { primaryText: noMatchFound, style: { cursor: 'default', padding: '10px 16px' }, disabled: true })
          ),
          multiple && _react2.default.createElement(
            'footer',
            { style: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' } },
            _react2.default.createElement(
              'div',
              { onTouchTap: this.closeMenu, style: menuFooterStyle },
              menuCloseButton
            )
          )
        )
      );
    }
  }]);

  return SelectField;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;

  this.onFocus = function () {
    return _this6.setState({ isFocused: true });
  };

  this.onBlur = function (event) {
    if (!_this6.state.isOpen) _this6.setState({ isFocused: false });
  };

  this.selectAll = function () {
    function valuesReducer(acc, _ref12) {
      var type = _ref12.type,
          _ref12$props = _ref12.props,
          value = _ref12$props.value,
          label = _ref12$props.label,
          cpc = _ref12$props.children;

      if (type === 'optgroup') {
        if (cpc) {
          if (Array.isArray(cpc)) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = cpc[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var c = _step4.value;

                if (isPresent(c.props.value)) {
                  var _c$props = c.props,
                      _value = _c$props.value,
                      _label = _c$props.label;

                  acc.push({ value: _value, label: _label });
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          } else if ((typeof cpc === 'undefined' ? 'undefined' : _typeof(cpc)) === 'object' && isPresent(cpc.props)) {
            var _cpc$props = cpc.props,
                _value2 = _cpc$props.value,
                _label2 = _cpc$props.label;

            acc.push({ value: _value2, label: _label2 });
          }
        }
      } else if (isPresent(value)) {
        acc.push({ value: value, label: label });
      }

      return acc;
    }

    function collectValues(children) {
      var values = [];

      if (Array.isArray(children) && children.length) {
        values = children.reduce(valuesReducer, []);
      } else if (!Array.isArray(children) && (typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object') {
        if (children.type === 'optgroup') {
          values = collectValues(children.props.children);
        } else if (isPresent(children.props.value)) {
          var _children$props = children.props,
              value = _children$props.value,
              label = _children$props.label;

          values = [{ value: value, label: label }];
        }
      }

      return values;
    }

    var _props3 = _this6.props,
        children = _props3.children,
        multiple = _props3.multiple,
        onChange = _props3.onChange,
        name = _props3.name;


    if (!multiple) return null;

    var updatedValues = collectValues(children);

    _this6.setState({ selectedItems: updatedValues }, function () {
      onChange(updatedValues, name);
    });
  };

  this.clearSelection = function () {
    var _props4 = _this6.props,
        onChange = _props4.onChange,
        name = _props4.name,
        multiple = _props4.multiple;


    var updatedValues = multiple ? [] : null;
    _this6.setState({ selectedItems: updatedValues }, function () {
      onChange(updatedValues, name);
    });
  };

  this.closeMenu = function (reason) {
    var _props5 = _this6.props,
        onChange = _props5.onChange,
        name = _props5.name;

    onChange(_this6.state.selectedItems, name);
    if (reason) _this6.setState({ isFocused: false }); // if reason === 'clickaway' or 'offscreen'
    _this6.setState({ isOpen: false, searchText: '' }, function () {
      return !reason && _this6.root.focus();
    });
  };

  this.handleClick = function (event) {
    return !_this6.props.disabled && _this6.openMenu();
  };

  this.handleKeyDown = function (event) {
    return !_this6.props.disabled && /ArrowDown|Enter/.test(event.key) && _this6.openMenu();
  };

  this.handleTextFieldAutocompletionFiltering = function (event, searchText) {
    _this6.props.onAutoCompleteTyping(searchText);
    _this6.setState({ searchText: searchText }, function () {
      return _this6.focusTextField();
    });
  };

  this.handleTextFieldKeyDown = function (_ref13) {
    var key = _ref13.key;

    switch (key) {
      case 'ArrowDown':
        _this6.focusMenuItem();
        break;

      case 'Escape':
        _this6.clearTextField();
        _this6.closeMenu();
        break;

      default:
        break;
    }
  };

  this.handleMenuSelection = function (selectedItem) {
    return function (event) {
      event.preventDefault();
      var selectedItems = _this6.state.selectedItems;
      var _props6 = _this6.props,
          onChange = _props6.onChange,
          name = _props6.name;


      if (_this6.props.multiple) {
        var selectedItemExists = selectedItems.some(function (obj) {
          return areEqual(obj.value, selectedItem.value);
        });
        var updatedValues = selectedItemExists ? selectedItems.filter(function (obj) {
          return !areEqual(obj.value, selectedItem.value);
        }) : selectedItems.concat(selectedItem);
        _this6.setState({ selectedItems: updatedValues }, function () {
          onChange(updatedValues, name);
        });
        _this6.clearTextField(function () {
          return _this6.focusTextField();
        });
      } else {
        var updatedValue = areEqual(selectedItems, selectedItem) ? null : selectedItem;
        _this6.setState({ selectedItems: updatedValue }, function () {
          return _this6.closeMenu();
        });
      }
    };
  };

  this.handleMenuKeyDown = function (_ref14) {
    var key = _ref14.key,
        tabIndex = _ref14.target.tabIndex;

    var cleanMenuItems = _this6.menuItems.filter(function (item) {
      return !!item;
    });
    var firstTabIndex = cleanMenuItems[0].props.tabIndex;
    var lastTabIndex = cleanMenuItems[cleanMenuItems.length - 1].props.tabIndex;
    var currentElementIndex = cleanMenuItems.findIndex(function (item) {
      return item.props.tabIndex === tabIndex;
    });
    switch (key) {
      case 'ArrowUp':
        if (+tabIndex === firstTabIndex) {
          _this6.state.showAutocomplete ? _this6.focusTextField() : _this6.focusMenuItem(lastTabIndex);
        } else {
          var previousTabIndex = cleanMenuItems.slice(0, currentElementIndex).slice(-1)[0].props.tabIndex;
          _this6.focusMenuItem(previousTabIndex);
        }
        break;

      case 'ArrowDown':
        if (+tabIndex === lastTabIndex) {
          _this6.state.showAutocomplete ? _this6.focusTextField() : _this6.focusMenuItem();
        } else {
          var nextTabIndex = cleanMenuItems.slice(currentElementIndex + 1)[0].props.tabIndex;
          _this6.focusMenuItem(nextTabIndex);
        }
        break;

      case 'PageUp':
        _this6.focusMenuItem();
        break;

      case 'PageDown':
        _this6.focusMenuItem(lastTabIndex);
        break;

      case 'Escape':
        _this6.closeMenu();
        break;

      default:
        break;
    }
  };
};

SelectField.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};

SelectField.propTypes = {
  anchorOrigin: _propTypes2.default.shape({
    vertical: _propTypes2.default.oneOf(['top', 'bottom']),
    horizontal: _propTypes2.default.oneOf(['left', 'right'])
  }),
  style: _propTypes2.default.object,
  menuStyle: _propTypes2.default.object,
  menuGroupStyle: _propTypes2.default.object,
  checkPosition: _propTypes2.default.oneOf(['', 'left', 'right']),
  checkedIcon: _propTypes2.default.node,
  unCheckedIcon: _propTypes2.default.node,
  hoverColor: _propTypes2.default.string,
  // children can be either:
  // an html element with a required 'value' property, and optional label prop,
  // an optgroup with valid children (same as bove case),
  // an array of either valid chidlren, or of optgroups hosting valid children
  children: _propTypes2.default.oneOfType([objectShape, function (props, propName, componentName, location, propFullName) {
    var pp = props[propName];
    if (pp.type === 'optgroup' && pp.props.children) {
      if (Array.isArray(pp.props.children)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = pp.props.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var child = _step2.value;

            if (!child.props.value) {
              return new Error('\n              Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + ' ' + props.name + '\'.\n              Validation failed.');
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } else if (_typeof(pp.props.children) === 'object' && !pp.props.children.props.value) {
        return new Error('\n          Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + ' ' + props.name + '\'.\n          Validation failed.');
      }
    }
  }, _propTypes2.default.arrayOf(function (props, propName, componentName, location, propFullName) {
    if (props[propName].type !== 'optgroup') {
      if (!props[propName].props.value) {
        return new Error('\n          Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + ' ' + props.name + '\'.\n          Validation failed.');
      }
    } else {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = props[propName].props.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var child = _step3.value;

          if (!child.props.value) {
            return new Error('\n            Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + ' ' + props.name + '\'.\n            Validation failed.');
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  })]),
  innerDivStyle: _propTypes2.default.object,
  selectedMenuItemStyle: _propTypes2.default.object,
  menuFooterStyle: _propTypes2.default.object,
  name: _propTypes2.default.string,
  floatingLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  floatingLabelFocusStyle: _propTypes2.default.object,
  underlineStyle: _propTypes2.default.object,
  underlineFocusStyle: _propTypes2.default.object,
  autocompleteUnderlineStyle: _propTypes2.default.object,
  autocompleteUnderlineFocusStyle: _propTypes2.default.object,
  hintText: _propTypes2.default.string,
  hintTextAutocomplete: _propTypes2.default.string,
  noMatchFound: _propTypes2.default.string,
  showAutocompleteThreshold: _propTypes2.default.number,
  elementHeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),
  nb2show: _propTypes2.default.number,
  value: function value(props, propName, componentName, location, propFullName) {
    var multiple = props.multiple,
        value = props.value;
    // console.debug(`value ${props.name}`, value)

    if (multiple) {
      if (!Array.isArray(value)) {
        return new Error('\n          When using \'multiple\' mode, \'value\' of \'' + componentName + ' ' + props.name + '\' must be an array.\n          Validation failed.');
      } else if (checkFormat(value) !== -1) {
        var index = checkFormat(value);
        return new Error('\n          \'value[' + index + ']\' of \'' + componentName + ' ' + props.name + '\' must be an object including a \'value\' property.\n          Validation failed.');
      }
    } else if (value !== null && ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !('value' in value))) {
      return new Error('\n        \'value\' of \'' + componentName + ' ' + props.name + '\' must be an object including a \'value\' property.\n        Validation failed.');
    }
  },
  autocompleteFilter: _propTypes2.default.func,
  selectionsRenderer: _propTypes2.default.func,
  menuCloseButton: _propTypes2.default.node,
  multiple: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onAutoCompleteTyping: _propTypes2.default.func,
  useLayerForClickAway: _propTypes2.default.bool,
  showSelectAll: _propTypes2.default.bool,
  headerStyle: _propTypes2.default.object
};

SelectField.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  checkPosition: '',
  checkedIcon: _react2.default.createElement(_check2.default, { style: { top: 'calc(50% - 12px)' } }),
  unCheckedIcon: _react2.default.createElement(_checkBoxOutlineBlank2.default, { style: { top: 'calc(50% - 12px)' } }),
  menuCloseButton: null,
  multiple: false,
  disabled: false,
  nb2show: 5,
  hintText: 'Click me',
  hintTextAutocomplete: 'Type something',
  noMatchFound: 'No match found',
  showAutocompleteThreshold: 10,
  elementHeight: 36,
  autocompleteFilter: function autocompleteFilter(searchText, text) {
    if (!text || typeof text !== 'string' && typeof text !== 'number') return false;
    if (typeof searchText !== 'string' && typeof searchText !== 'number') return false;
    return (text + '').toLowerCase().includes(searchText.toLowerCase());
  },
  value: null,
  onChange: function onChange() {},
  onAutoCompleteTyping: function onAutoCompleteTyping() {},
  children: [],
  useLayerForClickAway: false,
  showSelectAll: false,
  headerStyle: {}
};

exports.default = SelectField;
/**
 * Created by Raphaël on 17/02/2017.
 */
