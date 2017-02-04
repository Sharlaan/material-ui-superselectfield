#material-ui-superSelectField

## Table of Contents
- [Preview](#preview)
- [Installation](#installation)
- [Properties](#properties)
- [Usage examples](#usage)
- [Building](#building)
- [Tests](#tests)
- [Contributing](#contributing)

##Preview ([Live demo](https://sharlaan.github.io/material-ui-superselectfield)
![](https://github.com/Sharlaan/material-ui-superSelectField/blob/master/assets/dataSource.png)
![](https://github.com/Sharlaan/material-ui-superSelectField/blob/master/assets/caseInsensitive.png)
![](https://github.com/Sharlaan/material-ui-superSelectField/blob/master/assets/chips.png)


##Installation
`npm i material-ui-superselectfield`  

This component requires 4 dependencies :
- react
- react-dom
- react-tap-event-plugin 
- material-ui  

... so make sure they are installed in your project, or install them as well ;)

##Properties
| Name             | Type          | Default    | Description |
|:----             |:----          |:----       |:---- |
| name | string | | Required to differentiate between multiple instances of superSelectField in same page. |
| hintText | string | 'Click me' | Placeholder text |
| multiple | bool | false | Include this property to turn superSelectField into a multi-selection dropdown. Checkboxes will appear.|
| value | object, object[] | | Selected value(s).<br>/!\ REQUIRED: each object must expose a 'value' property. |
| onChange | function | | Triggers when selecting/unselecting an option from the Menu.<br>signature: (selectedValues, name) with `selectedValues` array of selected values based on selected nodes' value property, and `name` the value of the superSelectField instance's name property |
| children | any |  | Datasource is an array of any type of nodes, styled at your convenience.<br>/!\ REQUIRED: each node must expose a `value` property. This value property will be used by default for both option's value and label.<br>A `label` property can be provided to specify a different value than `value`. |
| nb2show | number | 5 | Number of options displayed from the menu. |
| elementHeight | number | 58 | Height in pixels of one option element. |
| showAutocompleteTreshold | number | 10 | Maximum number of options from which to display the autocomplete search field. |
| autocompleteFilter | function | see below | Provide your own filtering parser. Default: case insensitive.<br>The search field will appear only if there are more than 10 children (see `showAutocompleteTreshold`). |

####Styling properties
| Name             | Type          | Default    | Description |
|:----             |:----          |:----       |:---- |
| style | object | {} | Insert your own inlined styles, applied to the root component. |
| menuStyle | object | {} | Styles to be applied to the comtainer which will receive your children components. |
| menuGroupStyle | object | {} | Styles to be applied to the MenuItems hosting your \<optgroup/>. |
| innerDivStyle | object | {} | Styles to be applied to the inner div of MenuItems hosting each of your children components. |
| selectedMenuItemStyle | object | {color: muiTheme.menuItem.selectedTextColor} | Styles to be applied to the selected MenuItem. |
| selectionsRenderer | function | see below | Provide your own renderer for selected options. Defaults to concatenating children's values text. Check CodeExample1 for a more advanced renderer example. |

####Default functions
| Name | Default function |
|:---- |:---- |
| autocompleteFilter | ```(searchText, text) => !text || text.toLowerCase().includes(searchText.toLowerCase())``` | By default, the parser will check for `label` props, 'value' otherwise. |
| selectionsRenderer | <span>(value, hintText) => value.length<br>? typeof value === 'string' ? value : value.join(', ')<br>: hintText</span> | Provide your own renderer for selected options. Defaults to concatenating children's values text. Check CodeExample1 for a more advanced renderer example. |


## Usage
Check the `CodeExampleX.js` provided in the repository.

##Building

You can build the project with :
```
git clone https://github.com/Sharlaan/material-ui-superselectfield.git

npm i

npm start
```
It should open a new page on your default browser @ localhost:3000


## Tests


## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
