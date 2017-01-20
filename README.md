##material-ui-superSelectField

enhanced the original SelectField component with autocompletion and multiselection

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
| children | any |  | Datasource is an array of any type of nodes, styled at your convenience. /!\ IMPORTANT: each node must expose a `value` property (required). This value property will be used by default for both option's value and label. A `label` property can be provided to specify a different value than value |
| value | string, string[], object, object[] | | Selected values |
| autocomplete | bool | false | Turns superSelectField into an AutoComplete, with a search field. The search field will appear only if more than 10 children are displayed. |
| autocompleteFilter | function | <pre>(searchText, text) => !text || text.toLowerCase().includes(searchText.toLowerCase())</pre> | `autocomplete` must be set to true. Provide your own filtering parser. Default: case insensitive. |
| displaySelectionsRenderer | function | <pre>(value, hintText) => value.length
                                             ? typeof value === 'string' ? value : value.join(', ')
                                             : hintText</pre> | Provide your own renderer for selected options. Defaults to concatenating children's values text. Check CodeExample1 for a more advanced renderer example. |
| name | string | | Required to differentiate between multiple instances of superSelectField in same page. |
| hintText | string | 'Click me' | Placeholder text |
| multiple | bool | false | Include this property to turn superSelectField into a multi-selection dropdown. |
| onSelect | function | | signature: (selectedValue, name) with `selectedValue` the value of the selected node's value property, and `name` then value of the superSelectField instance's name property |
