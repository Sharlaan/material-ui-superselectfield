/**
 * Jest API
 * @see https://facebook.github.io/jest/docs/expect.html#content
 * 
 * Enzyme API
 * @see http://airbnb.io/enzyme/docs/api/shallow.html
 * 
 * How to test a React Component basing on a "Contract":
 * @see https://medium.freecodecamp.com/the-right-way-to-test-react-components-548a4736ab22#.hqprrvawg
 */

/* eslint-env jest */
import React from 'react'
import { render } from 'react-dom'
import { shallow } from 'enzyme'
import expect from 'expect'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SuperSelectField from './SuperSelectField'


Enzyme.configure({ adapter: new Adapter() });

const muiTheme = getMuiTheme()
const shallowWithContext = node => shallow(node, { context: { muiTheme } })
/*
const mountWithContext = node => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object}
})
*/
const testChildren = [
  <div key='0' value='1'>Test Child</div>,
  <div key='1' value='2'>Test Child</div>
]

const testChild = [
  <div key='0' value='1'>Test Child</div>
]

describe('Default states, styles, and behaviors', () => {
  it('renders without crashing', () => {
    const root = document.createElement('div')
    render(
      <MuiThemeProvider>
        <SuperSelectField />
      </MuiThemeProvider>,
      root
    )
  })

  it('expects the menu to be closed by default', () => {
    const wrapper = shallowWithContext(<SuperSelectField />)
    const menu = wrapper.find('Popover')
    expect(menu.props().open).toBe(false)
    // can also use wrapper.state('isOpen')
  })

  it('expects the menu to open when clicked', () => {
    const wrapper = shallowWithContext(<SuperSelectField>{testChildren}</SuperSelectField>)
    wrapper.simulate('click')
    expect(wrapper.find('Popover').props().open).toBe(true)
  })

  it('expects the menu to open when clicked even with one child', () => {
    const wrapper = shallowWithContext(<SuperSelectField>{testChild}</SuperSelectField>)
    wrapper.simulate('click')
    expect(wrapper.find('Popover').props().open).toBe(true)
  })

  it('expects the menu to render children', () => {
    const wrapper = shallowWithContext(<SuperSelectField>{testChildren}</SuperSelectField>)
    wrapper.simulate('click') // opens menu
    const firstChild = wrapper.find('ListItem').first()
    expect(firstChild.props().primaryText).toBe(testChildren[0])
  })

  it('expects the menu to render even with one child', () => {
    const wrapper = shallowWithContext(<SuperSelectField>{testChild}</SuperSelectField>)
    wrapper.simulate('click') // opens menu
    const firstChild = wrapper.find('ListItem').first()
    expect(firstChild.props().primaryText).toBe(testChild[0])
  })

  it('should display [hintText] when nothing selected')

  it('should pass the default selected item to the underlying MenuItem')
})

describe('When selecting an option', () => {
  it('expects the menu to close'/*, () => {
    const wrapper = shallowWithContext(<SuperSelectField>{testChildren}</SuperSelectField>)
    wrapper.simulate('click') // opens menu
    wrapper.find('ListItem').first().simulate('touchTap')
    expect(wrapper.find('Popover').props().open).toBe(false)
  }*/)

  it('expects the menu to close when clicking outside')

  /*  it('expects the onChange handler to be called', () => {
      const callback = jest.fn()
      const wrapper = shallowWithContext(<SuperSelectField onChange={callback}>{testChildren}</SuperSelectField>)
      wrapper.setState({ isOpen: true })
      expect(callback).not.toHaveBeenCalled()
      wrapper.find('MenuItem').first().simulate('touchTap')
      expect(callback).toHaveBeenCalledTimes(1)
      // expect(callback).toHaveBeenCalledWith(arg1, arg2, ...)
    }) */
})

describe('Children composition', () => {
  it('should throw if no `value` prop detected on custom tag')

  it('should detect custom html tag with `value` prop')

  it('should detect `optgroup` tag')

  it('should detect `value` prop on custom tag under `optgroup` tag')
})

describe('Autocomplete usage', () => {
  it('should show if [showAutocompleteThreshold] is less than children', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold={1}>{testChildren}</SuperSelectField>)
    wrapper.simulate('click')
    const firstChild = wrapper.find('TextField')
    expect(firstChild.exists()).toBe(true)
  })
  it('should NOT show if [showAutocompleteThreshold] is greater than children', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold={4}>{testChildren}</SuperSelectField>)
    wrapper.simulate('click')
    const firstChild = wrapper.find('TextField')
    expect(firstChild.exists()).toBe(false)
  })
  it('should show regardless of children with [showAutocompleteThreshold="always"]', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="always">{testChildren}</SuperSelectField>)
    wrapper.simulate('click')
    const firstChild = wrapper.find('TextField')
    expect(firstChild.exists()).toBe(true)
  })
  it('should open Menu and Autocomplete even if no children with [showAutocompleteThreshold="always"]', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="always">{[]}</SuperSelectField>)
    wrapper.simulate('click')
    const firstChild = wrapper.find('Popover')
    expect(firstChild.props().open).toBe(true)
  })
  it('should NOT open Menu if no children and [showAutocompleteThreshold={0}]', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold={0}>{[]}</SuperSelectField>)
    wrapper.simulate('click')
    const firstChild = wrapper.find('Popover')
    expect(firstChild.props().open).toBe(false)
  })
  it('should NOT show if [showAutocompleteThreshold="never"] regardless of children', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="never">{testChildren}</SuperSelectField>)
    wrapper.simulate('click')
    const firstChild = wrapper.find('TextField')
    expect(firstChild.exists()).toBe(false)
  })
  it('should display the default [hintTextAutocomplete]', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="always">{testChildren}</SuperSelectField>)
    wrapper.simulate('click')
    const firstChild = wrapper.find('TextField')
    expect(firstChild.props().hintText).toMatch('Type something')
  })
  it('should display the custom [hintTextAutocomplete]', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="always" hintTextAutocomplete="Custom">{testChildren}</SuperSelectField>)
    wrapper.simulate('click')
    const firstChild = wrapper.find('TextField')
    expect(firstChild.props().hintText).toMatch('Custom')
  })

  it('use the default case insensitive filter properly')

  it('executes custom filter function properly')

  it('should display `No match` when the filter returns null')
})

describe('Selections presenter', () => {
  it('should display the default [hintText]', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="always">{testChildren}</SuperSelectField>)
    const selectionsPresenter = wrapper.find('SelectionsPresenter')
    expect(selectionsPresenter.props().hintText).toMatch('Click me')
  })
  it('should display custom [hintText] properly', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="always" hintText="Hello There..">{testChildren}</SuperSelectField>)
    const selectionsPresenter = wrapper.find('SelectionsPresenter')
    expect(selectionsPresenter.props().hintText).toMatch('Hello There..')
  })
  it('should display the default [DropDownIcon]', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="always">{testChildren}</SuperSelectField>)
    const selectionsPresenter = wrapper.find('SelectionsPresenter')
    expect(selectionsPresenter.dive().find('NavigationArrowDropDown').length).toEqual(1)
  })
  it('should display the custom [DropDownIcon]', () => {
    const wrapper = shallowWithContext(<SuperSelectField showAutocompleteThreshold="always" dropDownIcon={<span id="customDropDown">></span>}>{testChildren}</SuperSelectField>)
    const selectionsPresenter = wrapper.find('SelectionsPresenter')
    expect(selectionsPresenter.dive().find('#customDropDown').length).toEqual(1)
  })

  it('use the default selection renderer properly')

  it('executes custom selection renderer function properly')

  it('')
})

describe('Focus and keystrokes handling', () => { })

/*
describe('', () => {
  it('')

  it('')
})
*/
