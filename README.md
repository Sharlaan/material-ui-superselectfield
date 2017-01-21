##material-ui-superSelectField

This project is currently in the process of publication into a npm module.
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

```
git clone https://github.com/Sharlaan/material-ui-superSelectField.git

npm i

npm start
```

It should a new page on your default browser @ localhost:3000
Then choose "Example 1" to check the superSelectField in action

##Preview
![](https://github.com/Sharlaan/material-ui-superSelectField/blob/master/dataSource.png)
![](https://github.com/Sharlaan/material-ui-superSelectField/blob/master/caseInsensitive.png)
![](https://github.com/Sharlaan/material-ui-superSelectField/blob/master/chips.png)


##Installation


##Properties
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| style | object | {} | Insert your own inlined styles, applied to the root component. |
| menuProps | object | {} | Styles to be applied to the inner Menu component |
| children | any |  | Datasource is an array of any type of nodes, styled at your convenience.<br>/!\ IMPORTANT: each node must expose a `value` property (required). This value property will be used by default for both option's value and label.<br>A `label` property can be provided to specify a different value than value |
| value | string, string[], object, object[] | | Selected values |
| autocomplete | bool | false | Turns superSelectField into an AutoComplete, with a search field. The search field will appear only if more than 10 children are displayed. |
| autocompleteFilter | function | see below | `autocomplete` must be set to true. Provide your own filtering parser. Default: case insensitive. |
| selectionsRenderer | function | see below | Provide your own renderer for selected options. Defaults to concatenating children's values text. Check CodeExample1 for a more advanced renderer example. |
| name | string | | Required to differentiate between multiple instances of superSelectField in same page. |
| hintText | string | 'Click me' | Placeholder text |
| multiple | bool | false | Include this property to turn superSelectField into a multi-selection dropdown. |
| onSelect | function | | Triggers when selecting/unselecting an option from the Menu.<br>signature: (selectedValues, name) with `selectedValues` array of selected values based on selected nodes' value property, and `name` the value of the superSelectField instance's name property |

####Default functions
| Name | Default function |
| --- | --- |
| autocompleteFilter | ```(searchText, text) => !text || text.toLowerCase().includes(searchText.toLowerCase())``` | `autocomplete` must be set to true. Provide your own filtering parser. Default: case insensitive. |
| selectionsRenderer | <span>(value, hintText) => value.length<br>? typeof value === 'string' ? value : value.join(', ')<br>: hintText</span> | Provide your own renderer for selected options. Defaults to concatenating children's values text. Check CodeExample1 for a more advanced renderer example. |


## Usage


## Tests


## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.