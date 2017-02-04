'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _div, _div2;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactInfinite = require('react-infinite');

var _reactInfinite2 = _interopRequireDefault(_reactInfinite);

var _Popover = require('material-ui/Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _TextField = require('material-ui/TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _MenuItem = require('material-ui/MenuItem/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _checkBoxOutlineBlank = require('material-ui/svg-icons/toggle/check-box-outline-blank');

var _checkBoxOutlineBlank2 = _interopRequireDefault(_checkBoxOutlineBlank);

var _arrowDropDown = require('material-ui/svg-icons/navigation/arrow-drop-down');

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var areEqual = function areEqual(val1, val2) {
  if ((typeof val1 === 'undefined' ? 'undefined' : _typeof(val1)) !== (typeof val2 === 'undefined' ? 'undefined' : _typeof(val2))) return false;else if (typeof val1 === 'string' || typeof val1 === 'number') return val1 === val2;else if ((typeof val1 === 'undefined' ? 'undefined' : _typeof(val1)) === 'object') {
    var _ret = function () {
      var props1 = Object.keys(val1);
      var props2 = Object.keys(val2);
      var values1 = Object.values(val1);
      var values2 = Object.values(val2);
      return {
        v: props1.length === props2.length && props1.every(function (key) {
          return props2.includes(key);
        }) && values1.every(function (val) {
          return values2.includes(val);
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
};

// ================================================================
// ====================  SelectionsPresenter  =====================
// ================================================================

// noinspection JSDuplicatedDeclaration
var styles = {
  div1: (_div = {
    height: '100%',
    display: '-webkit-box'
  }, _defineProperty(_div, 'display', '-webkit-flex'), _defineProperty(_div, 'display', '-moz-box'), _defineProperty(_div, 'display', '-ms-flexbox'), _defineProperty(_div, 'display', '-o-flex'), _defineProperty(_div, 'display', 'flex'), _defineProperty(_div, 'WebkitBoxOrient', 'vertical'), _defineProperty(_div, 'WebkitBoxDirection', 'normal'), _defineProperty(_div, 'WebkitFlexDirection', 'column'), _defineProperty(_div, 'msFlexDirection', 'column'), _defineProperty(_div, 'OFlexDirection', 'column'), _defineProperty(_div, 'flexDirection', 'column'), _defineProperty(_div, 'WebkitBoxPack', 'end'), _defineProperty(_div, 'WebkitJustifyContent', 'flex-end'), _defineProperty(_div, 'msFlexPack', 'end'), _defineProperty(_div, 'OJustifyContent', 'flex-end'), _defineProperty(_div, 'justifyContent', 'flex-end'), _div),
  div2: (_div2 = {
    display: '-webkit-box'
  }, _defineProperty(_div2, 'display', '-webkit-flex'), _defineProperty(_div2, 'display', '-moz-box'), _defineProperty(_div2, 'display', '-ms-flexbox'), _defineProperty(_div2, 'display', '-o-flex'), _defineProperty(_div2, 'display', 'flex'), _defineProperty(_div2, 'WebkitBoxPack', 'end'), _defineProperty(_div2, 'WebkitJustifyContent', 'flex-end'), _defineProperty(_div2, 'msFlexPack', 'end'), _defineProperty(_div2, 'OJustifyContent', 'flex-end'), _defineProperty(_div2, 'justifyContent', 'flex-end'), _defineProperty(_div2, 'WebkitAlignItems', 'center'), _defineProperty(_div2, 'MozAlignItems', 'center'), _defineProperty(_div2, 'msAlignItems', 'center'), _defineProperty(_div2, 'OAlignItems', 'center'), _defineProperty(_div2, 'alignItems', 'center'), _div2),
  div3: {
    WebkitBoxFlex: 1,
    MozBoxFlex: 1,
    WebkitFlex: 1,
    msFlex: 1,
    OFlex: 1,
    flex: 1
  }
};

var SelectionsPresenter = function SelectionsPresenter(_ref) {
  var value = _ref.value,
      hintText = _ref.hintText,
      selectionsRenderer = _ref.selectionsRenderer;

  // TODO: add floatingLabelText
  return _react2.default.createElement(
    'div',
    { style: styles.div1 },
    _react2.default.createElement(
      'div',
      { style: styles.div2 },
      _react2.default.createElement(
        'div',
        { style: styles.div3 },
        selectionsRenderer(value, hintText)
      ),
      _react2.default.createElement(_arrowDropDown2.default, null)
    ),
    _react2.default.createElement('hr', { style: { width: '100%', margin: 0 } })
  );
};

var objectShape = _react.PropTypes.shape({
  value: _react.PropTypes.any.isRequired,
  label: _react.PropTypes.string
});

SelectionsPresenter.propTypes = {
  value: _react.PropTypes.oneOfType([objectShape, _react.PropTypes.arrayOf(objectShape)]),
  selectionsRenderer: _react.PropTypes.func,
  hintText: _react.PropTypes.string
};

// noinspection JSUnusedGlobalSymbols
SelectionsPresenter.defaultProps = {
  hintText: 'Click me',
  value: { value: '' },
  selectionsRenderer: function selectionsRenderer(value, hintText) {
    if (Array.isArray(value)) {
      return value.map(function (_ref2) {
        var value = _ref2.value,
            label = _ref2.label;
        return label || value;
      }).join(', ');
    } else if (value.label || value.value) return value.label || value.value;else return hintText;
  }
};

// ================================================================
// ========================  SelectField  =========================
// ================================================================

var SelectField = function (_Component) {
  _inherits(SelectField, _Component);

  function SelectField(props, context) {
    _classCallCheck(this, SelectField);

    var _this = _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call(this, props, context));

    _this.handleClick = function () {
      _this.openMenu(); // toggle instead of close ? (in case user changes  targetOrigin/anchorOrigin)
    };

    _this.handleKeyDown = function (event) {
      if (/ArrowDown|Enter/.test(event.key)) _this.openMenu();
    };

    _this.handlePopoverClose = function (reason) {
      _this.closeMenu(); // toggle instead of close ? (in case user changes targetOrigin/anchorOrigin)
    };

    _this.handleTextFieldAutocompletionFiltering = function (event, searchText) {
      _this.setState({ searchText: searchText }, function () {
        return _this.focusTextField();
      });
    };

    _this.handleTextFieldKeyDown = function (event) {
      switch (event.key) {
        case 'ArrowDown':
          _this.focusFirstMenuItem();
          break;

        case 'Escape':
          _this.clearTextField();
          _this.closeMenu();
          break;

        default:
          break;
      }
    };

    _this.handleMenuSelection = function (selectedItem) {
      return function (event) {
        var _this$props = _this.props,
            value = _this$props.value,
            multiple = _this$props.multiple,
            onChange = _this$props.onChange,
            name = _this$props.name;

        if (multiple) {
          console.debug('value', value);
          var selectedItemExists = value.some(function (obj) {
            return areEqual(obj.value, selectedItem.value);
          });
          var updatedValues = selectedItemExists ? value.filter(function (obj) {
            return !areEqual(obj.value, selectedItem.value);
          }) : value.concat(selectedItem);
          onChange(updatedValues, name);
          _this.clearTextField(function () {
            return _this.focusTextField();
          });
        } else {
          onChange(selectedItem, name);
          _this.closeMenu();
        }
      };
    };

    _this.handleMenuEscKeyDown = function () {
      return _this.closeMenu();
    };

    _this.handleMenuKeyDown = function (event) {
      // TODO: this solution propagates and triggers double onKeyDown
      // if event.stopPropagation(), nothing works, so the correct trigger is the 2nd one
      switch (event.key) {
        case 'ArrowUp':
          // TODO: add Shift+Tab
          // TODO: add if current MenuItem === firstChild
          _this.focusTextField();
          break;

        case 'ArrowDown':
          // TODO: if current MenuItem === lastChild, this.focusFirstMenuItem()
          break;

        case 'PageUp':
          // TODO: this.focusFirstMenuItem()
          break;

        case 'PageDown':
          // TODO: this.focusLastMenuItem()
          _this.focusLastMenuItem();
          break;

        default:
          break;
      }
    };

    _this.state = {
      isOpen: false,
      itemsLength: _this.getChildrenLength(props.children),
      searchText: ''
    };
    return _this;
  }

  // Counts nodes with non-null value property + optgroups
  // noinspection JSMethodCanBeStatic


  _createClass(SelectField, [{
    key: 'getChildrenLength',
    value: function getChildrenLength(children) {
      var count = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          if (child.type === 'optgroup') {
            ++count;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = child.props.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var c = _step2.value;

                if (c.props.value) ++count;
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
          } else if (child.props.value) ++count;
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

      return count;
    }
  }, {
    key: 'closeMenu',
    value: function closeMenu() {
      var _this2 = this;

      this.setState({ isOpen: false, searchText: '' }, function () {
        return (0, _reactDom.findDOMNode)(_this2.root).focus();
      });
    }
  }, {
    key: 'openMenu',
    value: function openMenu() {
      var _this3 = this;

      this.setState({ isOpen: true }, function () {
        return _this3.focusTextField();
      });
    }
  }, {
    key: 'clearTextField',
    value: function clearTextField(callback) {
      this.setState({ searchText: '' }, callback);
    }
  }, {
    key: 'focusTextField',
    value: function focusTextField() {
      if (this.state.itemsLength > 10) {
        var input = (0, _reactDom.findDOMNode)(this.searchTextField).getElementsByTagName('input')[0];
        input.focus();
      }
    }
  }, {
    key: 'focusFirstMenuItem',
    value: function focusFirstMenuItem() {
      var firstMenuItem = (0, _reactDom.findDOMNode)(this.menu).querySelector('[tabindex="0"]');
      firstMenuItem.focus();
    }
  }, {
    key: 'focusLastMenuItem',
    value: function focusLastMenuItem() {
      var menuItems = (0, _reactDom.findDOMNode)(this.menu).querySelectorAll('[tabindex]');
      var lastMenuItem = menuItems[menuItems.length - 1];
      lastMenuItem.focus();
    }

    /**
     * Main Component Wrapper methods
     */


    /**
     * Popover methods
     */


    /**
     * SelectionPresenter methods
     */


    /**
     * Menu methods
     */

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          value = _props.value,
          hintText = _props.hintText,
          multiple = _props.multiple,
          children = _props.children,
          nb2show = _props.nb2show,
          showAutocompleteTreshold = _props.showAutocompleteTreshold,
          autocompleteFilter = _props.autocompleteFilter,
          selectionsRenderer = _props.selectionsRenderer,
          style = _props.style,
          menuStyle = _props.menuStyle,
          elementHeight = _props.elementHeight,
          innerDivStyle = _props.innerDivStyle,
          selectedMenuItemStyle = _props.selectedMenuItemStyle,
          menuGroupStyle = _props.menuGroupStyle;

      // Default style depending on Material-UI context

      var mergedSelectedMenuItemStyle = _extends({
        color: this.context.muiTheme.menuItem.selectedTextColor }, selectedMenuItemStyle);

      /**
       * MenuItems building, based on user's children
       * 1st unction is the base process for producing a MenuItem,
       * including filtering from the Autocomplete.
       * 2nd function is the main loop over children array,
       * accounting for optgroups.
       */
      var menuItemBuilder = function menuItemBuilder(nodes, child, index) {
        var groupIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var _child$props = child.props,
            childValue = _child$props.value,
            label = _child$props.label;

        if (!autocompleteFilter(_this4.state.searchText, label || childValue)) return nodes;
        var isSelected = Array.isArray(value) ? value.some(function (obj) {
          return areEqual(obj.value, childValue);
        }) : value.value === childValue;
        return [].concat(_toConsumableArray(nodes), [_react2.default.createElement(_MenuItem2.default, {
          key: groupIndex + index,
          tabIndex: index,
          checked: multiple && isSelected,
          leftIcon: multiple && !isSelected ? _react2.default.createElement(_checkBoxOutlineBlank2.default, null) : null,
          primaryText: child,
          disableFocusRipple: true,
          innerDivStyle: _extends({ paddingTop: 5, paddingBottom: 5 }, innerDivStyle),
          style: isSelected ? mergedSelectedMenuItemStyle : null,
          onTouchTap: _this4.handleMenuSelection({ value: childValue, label: label })
        })]);
      };
      var menuItems = this.state.isOpen && children && children.reduce(function (nodes, child, index) {
        if (child.type !== 'optgroup') return menuItemBuilder(nodes, child, index);

        var menuGroup = _react2.default.createElement(_MenuItem2.default, {
          disabled: true,
          key: 'group' + index,
          primaryText: child.props.label,
          style: _extends({ cursor: 'default' }, menuGroupStyle)
        });
        var groupedItems = child.props.children.reduce(function (nodes, child, idx) {
          return menuItemBuilder(nodes, child, idx, 'group' + index);
        }, []);
        return [].concat(_toConsumableArray(nodes), [menuGroup], _toConsumableArray(groupedItems));
      }, []);

      var containerHeight = elementHeight * (nb2show < menuItems.length ? nb2show : menuItems.length);
      var showAutocomplete = this.state.itemsLength > showAutocompleteTreshold;
      var popoverHeight = (showAutocomplete ? 53 : 0) + (containerHeight || elementHeight);
      var scrollableStyle = { overflowY: nb2show >= menuItems.length ? 'hidden' : 'scroll' };
      var menuWidth = this.root ? this.root.clientWidth : null;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref5) {
            return _this4.root = _ref5;
          },
          tabIndex: '0',
          style: _extends({ cursor: 'pointer' }, style),
          onKeyDown: this.handleKeyDown,
          onClick: this.handleClick,
          onBlur: this.handleBlur
        },
        _react2.default.createElement(SelectionsPresenter, {
          hintText: hintText,
          value: value,
          selectionsRenderer: selectionsRenderer
        }),
        _react2.default.createElement(
          _Popover2.default,
          {
            open: this.state.isOpen,
            anchorEl: this.root,
            canAutoPosition: false,
            anchorOrigin: { vertical: 'top', horizontal: 'left' },
            useLayerForClickAway: false,
            onRequestClose: this.handlePopoverClose,
            style: { height: popoverHeight || 0 }
          },
          showAutocomplete && _react2.default.createElement(_TextField2.default, {
            name: 'autoComplete',
            ref: function ref(_ref3) {
              return _this4.searchTextField = _ref3;
            },
            value: this.state.searchText,
            hintText: hintText,
            onChange: this.handleTextFieldAutocompletionFiltering,
            onKeyDown: this.handleTextFieldKeyDown,
            style: { marginLeft: 16, marginBottom: 5, width: menuWidth - 16 * 2 }
          }),
          _react2.default.createElement(
            'div',
            {
              ref: function ref(_ref4) {
                return _this4.menu = _ref4;
              },
              style: _extends({ width: menuWidth }, menuStyle)
            },
            menuItems.length ? _react2.default.createElement(
              _reactInfinite2.default,
              {
                containerHeight: containerHeight || 0,
                elementHeight: elementHeight,
                styles: { scrollableStyle: scrollableStyle }
              },
              menuItems
            ) : _react2.default.createElement(_MenuItem2.default, { primaryText: 'No match found', style: { cursor: 'default' }, disabled: true })
          )
        )
      );
    }
  }]);

  return SelectField;
}(_react.Component);

SelectField.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};

SelectField.propTypes = {
  style: _react.PropTypes.object,
  menuStyle: _react.PropTypes.object,
  menuGroupStyle: _react.PropTypes.object,
  // children can be any html element but with a required 'value' property
  children: _react.PropTypes.arrayOf(function (props, propName, componentName, location, propFullName) {
    if (props[propName].type !== 'optgroup') {
      if (!props[propName].props.value) {
        return new Error('\n          Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + '\'. \n          Validation failed.');
      }
    } else {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = props[propName].props.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var child = _step3.value;

          if (!child.props.value) {
            return new Error('\n            Missing required property \'value\' for \'' + propFullName + '\' supplied to \'' + componentName + '\'. \n            Validation failed.');
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
  }),
  innerDivStyle: _react.PropTypes.object,
  selectedMenuItemStyle: _react.PropTypes.object,
  name: _react.PropTypes.string,
  hintText: _react.PropTypes.string,
  showAutocompleteTreshold: _react.PropTypes.number,
  elementHeight: _react.PropTypes.number,
  nb2show: _react.PropTypes.number,
  value: _react.PropTypes.oneOfType([objectShape, _react.PropTypes.arrayOf(objectShape)]),
  autocompleteFilter: _react.PropTypes.func,
  selectionsRenderer: _react.PropTypes.func,
  multiple: _react.PropTypes.bool,
  onChange: _react.PropTypes.func
};

// noinspection JSUnusedGlobalSymbols
SelectField.defaultProps = {
  multiple: false,
  nb2show: 5,
  showAutocompleteTreshold: 10,
  elementHeight: 58,
  autocompleteFilter: function autocompleteFilter(searchText, text) {
    return !text || (text + '').toLowerCase().includes(searchText.toLowerCase());
  }
};

exports.default = SelectField;
