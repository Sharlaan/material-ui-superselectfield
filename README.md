# material-ui-superSelectField [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/material-ui-superselectfield.svg
[npm-url]: https://npmjs.org/package/material-ui-superselectfield
[downloads-image]: https://img.shields.io/npm/dm/material-ui-superselectfield.svg
[downloads-url]: https://npmjs.org/package/material-ui-superselectfield
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

## Table of Contents
- [Preview](#preview)
- [Installation](#installation)
- [Properties](#properties)
- [Usage examples](#usage)
- [Building](#building)
- [Tests](#tests)
- [Contributing](#contributing)
- [TodoList](#todolist)

## Preview ([Live demo](https://sharlaan.github.io/material-ui-superselectfield))
![](https://github.com/Sharlaan/material-ui-superselectfield/blob/master/src/assets/dataSource.png)
![](https://github.com/Sharlaan/material-ui-superselectfield/blob/master/src/assets/caseInsensitive.png)
![](https://github.com/Sharlaan/material-ui-superselectfield/blob/master/src/assets/chips.png)


## Installation
`npm i material-ui-superselectfield`  

This component requires 4 dependencies :
- react
- react-dom
- material-ui  

... so make sure they are installed in your project, or install them as well ;)


## Properties
| Name             | Type          | Default    | Description |
|:----             |:----          |:----       |:---- |
| name | string | | Required to differentiate between multiple instances of superSelectField in same page. |
| floatingLabel | string or node | | The content to use for the floating label element. |
| hintText | string | 'Click me' | Placeholder text for the main selections display. |
| hintTextAutocomplete | string | 'Type something' | Placeholder text for the autocomplete. |
| noMatchFound | string | 'No match found' | Placeholder text when the autocomplete filter fails. |
| anchorOrigin | object | `{ vertical: 'top', horizontal: 'left' }` | Anchor position of the menu, accepted values: `top, bottom / left, right` |
| checkPosition | string |  | Position of the checkmark in multiple mode. Accepted values: `'', left, right` |
| multiple | bool | false | Include this property to turn superSelectField into a multi-selection dropdown. Checkboxes will appear.|
| disabled | bool | false | Include this property to disable superSelectField.|
| value | null, object, object[] | null | Selected value(s).<br>/!\ REQUIRED: each object must expose a 'value' property. |
| onChange | function | () => {} | Triggers when selecting/unselecting an option from the Menu.<br>signature: (selectedValues, name) with `selectedValues` array of selected values based on selected nodes' value property, and `name` the value of the superSelectField instance's name property |
| onAutoCompleteTyping | function | () => {} | Exposes the word typed in AutoComplete. Useful for triggering onType API requests. |
| children | any | [] | Datasource is an array of any type of nodes, styled at your convenience.<br>/!\ REQUIRED: each node must expose a `value` property. This value property will be used by default for both option's value and label.<br>A `label` property can be provided to specify a different value than `value`. |
| nb2show | number | 5 | Number of options displayed from the menu. |
| elementHeight | number, number[] | 36 | Height in pixels of each option element. If elements have different heights, you can provide them in an array. |
| showAutocompleteThreshold | number | 10 | Maximum number of options from which to display the autocomplete search field.<br> For example, if autoComplete textfield need to be disabled, just set this prop with a value higher than children length. |
| autocompleteFilter | function | see below | Provide your own filtering parser. Default: case insensitive.<br>The search field will appear only if there are more than 10 children (see `showAutocompleteThreshold`).<br>By default, the parser will check for `label` props, 'value' otherwise. |
| useLayerForClickAway | bool | false | If true, the popover dropdown will render on top of an invisible layer, which will prevent clicks to the underlying elements, and trigger an `onRequestClose('clickAway')` call. |
##### Note when setting value :
if multiple is set, value must be at least an empty Array.  
For single value mode, you can set value to null.  
When using objects, make sure they expose a non-null value property.  
PropTypes should raise warnings if implementing otherwise.

#### Styling properties
| Name             | Type          | Default    | Description |
|:----             |:----          |:----       |:---- |
| style | object | {} | Insert your own inlined styles, applied to the root component. |
| menuStyle | object | {} | Styles applied to the comtainer which will receive your children components. |
| menuGroupStyle | object | {} | Styles applied to the MenuItems hosting your \<optgroup/>. |
| innerDivStyle | object | {} | Styles applied to the inner div of MenuItems hosting each of your children components. |
| menuFooterStyle | object | {} | Styles applied to the Menu's footer. |
| menuCloseButton | node |  | A button for an explicit closing of the menu. Useful on mobiles. |
| selectedMenuItemStyle | object | {color: muiTheme.menuItem.selectedTextColor} | Styles to be applied to the selected MenuItem. |
| selectionsRenderer | function | see below | Provide your own renderer for selected options. Defaults to concatenating children's values text. Check CodeExample4 for a more advanced renderer example. |
| checkedIcon | SVGicon | see below | The SvgIcon to use for the checked state. This is useful to create icon toggles. |
| unCheckedIcon | SVGicon | see below | The SvgIcon to use for the unchecked state. This is useful to create icon toggles. |
| hoverColor | string | 'rgba(69, 90, 100, 0.1)' | Overrides the hover background color. |
| floatingLabelStyle | object | | Allows to change the styles of the floating label. |
| floatingLabelFocusStyle | object | | Allows to change the styles of the floating label when focused. |
| underlineStyle | object | | Allows to change the styles of the underline. |
| underlineFocusStyle | object | | Allows to change the styles of the underline when focused. |
| autocompleteUnderlineStyle | object | | Allows to change the styles of the searchTextField's underline. |
| autocompleteUnderlineFocusStyle | object | | Allows to change the styles of the searchTextField's underline when focused. |

#### Default functions
| Name | Default function |
|:---- |:---- |
| checkedIcon | `<CheckedIcon style={{ top: 'calc(50% - 12px)' }} />` |
| unCheckedIcon | `<UnCheckedIcon style={{ top: 'calc(50% - 12px)' }} />` |
| autocompleteFilter | ```(searchText, text) => !text || text.toLowerCase().includes(searchText.toLowerCase())``` |
| selectionsRenderer |  |
<pre>(values, hintText) => {
   if (!values) return hintText
   const { value, label } = values
   if (Array.isArray(values)) {
      return values.length
         ? values.map(({ value, label }) => label || value).join(', ')
         : hintText
   }
   else if (label || value) return label || value
   else return hintText
}</pre>


## Usage
Check the `CodeExampleX.js` provided in the repository.

## Building

You can build the project with :   
```
git clone https://github.com/Sharlaan/material-ui-superselectfield.git
npm i && npm start
```   
It should open a new page on your default browser @ localhost:3000


## Tests
`npm test`


## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.


## Known bugs
- keyboard-focus handling combined with optgroups and autocompleted results
- dynamic heights calculation


## TodoList

- [x] implement onClose handler for multiple mode, to allow registering selected values in oneshot instead of exposing values at each selection (ie one single server request)

- [ ] set autoWidth to false automatically if width prop has a value

- [ ] add a css rule for this.root :focus { outline: 'none' }, and :hover { darken }

- [ ] add tests for focus states/styles when tabbing between multiple superSelectFields
- [ ] add tests for keystrokes

- [x] add proptypes checking for value and children

- [x] support of \<optgroup />

- [x] check rendering performance with 200 MenuItems (integrate react-infinite)

- [ ] implement the container for errors (absolutely positioned below the focusedLine)

  Expose more props :
  - [x] noMatchFound message
  - [ ] floatingLabelText
  - [ ] canAutoPosition
  - [x] checkPosition
  - [x] anchorOrigin
  - [ ] popoverStyle
  - [x] hoverColor
  - [x] disabled
  - [ ] required
  - [ ] errorMessage
  - [ ] errorStyle

- [x] add props.disableAutoComplete (default: false), or a nbItems2showAutocomplete (default: null, meaning never show the searchTextField)
- [x] make Autocomplete appears only if current numberOfMenuItems > props.autocompleteTreshold

- [x] implement a checkboxRenderer for MenuItem (or expose 2 properties CheckIconFalse & CheckIconTrue)
- [x] make a PR reimplementing MenuItem.insetChildren replaced with checkPosition={'left'(default) or 'right'}

- [ ] add an example with GooglePlaces
