'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Popover = require('material-ui/Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _TextField = require('material-ui/TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Menu = require('material-ui/Menu/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

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

// ================================================================
// ====================  SelectionsPresenter  =====================
// ================================================================

var SelectionsPresenter = function SelectionsPresenter(_ref) {
  var value = _ref.value,
      hintText = _ref.hintText,
      selectionsRenderer = _ref.selectionsRenderer;

  // TODO: add floatingLabelText
  return _react2.default.createElement(
    'div',
    { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' } },
    _react2.default.createElement(
      'div',
      { style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' } },
      _react2.default.createElement(
        'div',
        { style: { flex: 1 } },
        selectionsRenderer(value, hintText)
      ),
      _react2.default.createElement(_arrowDropDown2.default, null)
    ),
    _react2.default.createElement('hr', { style: { width: '100%', margin: 0 } })
  );
};

SelectionsPresenter.propTypes = {
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.object, _react.PropTypes.arrayOf(_react.PropTypes.object)]),
  selectionsRenderer: _react.PropTypes.func,
  hintText: _react.PropTypes.string
};

// noinspection JSUnusedGlobalSymbols
SelectionsPresenter.defaultProps = {
  hintText: 'Click me',
  // eslint-disable-next-line no-unused-vars
  selectionsRenderer: function selectionsRenderer(value, hintText) {
    return value.length ? typeof value === 'string' ? value : value.join(', ') : hintText;
  }
};

// ================================================================
// ========================  SelectField  =========================
// ================================================================

var SelectField = function (_Component) {
  _inherits(SelectField, _Component);

  function SelectField() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function () {
      _this.openMenu(); // toggle instead of close ? (in case user changes  targetOrigin/anchorOrigin)
    }, _this.handleKeyDown = function (event) {
      if (/ArrowDown|Enter/.test(event.key)) _this.openMenu();
    }, _this.handlePopoverClose = function (reason) {
      _this.closeMenu(); // toggle instead of close ? (in case user changes targetOrigin/anchorOrigin)
    }, _this.handleTextFieldAutocompletionFiltering = function (event, searchText) {
      _this.setState({ searchText: searchText }, function () {
        return _this.focusTextField();
      });
    }, _this.handleTextFieldKeyDown = function (event) {
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
    }, _this.handleMenuSelection = function (event, selectedMenuItem) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onSelect = _this$props.onSelect,
          name = _this$props.name;

      onSelect(selectedMenuItem, name);
      multiple ? _this.clearTextField(function () {
        return _this.focusTextField();
      }) : _this.closeMenu();
    }, _this.handleMenuEscKeyDown = function () {
      return _this.closeMenu();
    }, _this.handleMenuKeyDown = function (event) {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ isOpen: false, searchText: '' });
    }

    // for debugging/styling purposes, set this to null
    // to disable list autoclosing on clickAway

  }, {
    key: 'closeMenu',
    value: function closeMenu() {
      var _this2 = this;

      this.setState({ isOpen: false, searchText: '' }, function () {
        (0, _reactDom.findDOMNode)(_this2.root).focus();
      });
    }
  }, {
    key: 'openMenu',
    value: function openMenu() {
      var _this3 = this;

      this.setState({ isOpen: true }, function () {
        _this3.focusTextField();
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
      if (this.props.children.length > 10) {
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
          style = _props.style,
          menuProps = _props.menuProps,
          autocompleteFilter = _props.autocompleteFilter,
          selectionsRenderer = _props.selectionsRenderer;

      var menuItems = this.state.isOpen && children && children.reduce(function (nodes, child, index) {
        if (!autocompleteFilter(_this4.state.searchText, child.props.label)) return nodes;
        var isSelected = value.includes(child.props.value);
        return [].concat(_toConsumableArray(nodes), [_react2.default.createElement(_MenuItem2.default, {
          key: index,
          tabIndex: index,
          value: child.props.value,
          checked: multiple && isSelected,
          leftIcon: multiple && !isSelected ? _react2.default.createElement(_checkBoxOutlineBlank2.default, null) : null,
          primaryText: child,
          disableFocusRipple: true,
          innerDivStyle: { paddingTop: 5, paddingBottom: 5 }
        })]);
      }, []);

      // TODO: set autoWidth to false automatically if width prop has a value
      var menuWidth = this.root ? this.root.clientWidth : null;

      // TODO: check rendering performance with 200 MenuItems (integrate react-virtualized ?)

      // TODO: add props.disableAutoComplete (default: false)

      // TODO: implement a checkboxRenderer for MenuItem (or expose 2 properties CheckIconFalse & CheckIconTrue)

      // TODO: make SelectionsPresenter appears only if current numMenuItems > this.maxMenuItems

      // TODO: add a css rule for this.root :focus { outline: 'none' }, and :hover { darken }

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref5) {
            return _this4.root = _ref5;
          },
          tabIndex: '0',
          style: _extends({ cursor: 'pointer' }, style) // eslint-disable-line object-property-newline
          , onKeyDown: this.handleKeyDown,
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
            onRequestClose: this.handlePopoverClose
          },
          children.length > 10 && _react2.default.createElement(_TextField2.default, {
            name: 'autoComplete',
            ref: function ref(_ref3) {
              return _this4.searchTextField = _ref3;
            },
            value: this.state.searchText,
            hintText: hintText,
            onChange: this.handleTextFieldAutocompletionFiltering,
            onKeyDown: this.handleTextFieldKeyDown,
            style: { marginLeft: 16, width: menuWidth - 16 * 2 }
          }),
          _react2.default.createElement(
            _Menu2.default,
            _extends({
              ref: function ref(_ref4) {
                return _this4.menu = _ref4;
              }
            }, menuProps, {
              value: value,
              multiple: multiple,
              initiallyKeyboardFocused: true,
              onChange: this.handleMenuSelection,
              onEscKeyDown: this.handleMenuEscKeyDown,
              onKeyDown: this.handleMenuKeyDown,
              desktop: true,
              autoWidth: false,
              width: menuWidth
            }),
            menuItems.length ? menuItems : _react2.default.createElement(_MenuItem2.default, { primaryText: 'No match found', disabled: true })
          )
        )
      );
    }
  }]);

  return SelectField;
}(_react.Component);

SelectField.propTypes = {
  style: _react.PropTypes.object,
  menuProps: _react.PropTypes.object,
  children: _react.PropTypes.any,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.object, _react.PropTypes.arrayOf(_react.PropTypes.object)]),
  autocompleteFilter: _react.PropTypes.func,
  selectionsRenderer: _react.PropTypes.func,
  name: _react.PropTypes.string,
  hintText: _react.PropTypes.string,
  multiple: _react.PropTypes.bool,
  onSelect: _react.PropTypes.func
};

// noinspection JSUnusedGlobalSymbols
SelectField.defaultProps = {
  multiple: false,
  autoComplete: false,
  // eslint-disable-next-line no-unused-vars
  autocompleteFilter: function autocompleteFilter(searchText, text) {
    return !text || text.toLowerCase().includes(searchText.toLowerCase());
  }
};

exports.default = SelectField;
