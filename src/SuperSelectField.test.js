// Jest API: https://facebook.github.io/jest/docs/expect.html#content
// Enzyme API: http://airbnb.io/enzyme/docs/api/shallow.html
// How to test a React Component basing on a "Contract":
// https://medium.freecodecamp.com/the-right-way-to-test-react-components-548a4736ab22#.hqprrvawg

/* eslint-env jest */
import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { shallow, mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SuperSelectField from './SuperSelectField'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const muiTheme = getMuiTheme()
const shallowWithContext = node => shallow(node, {context: {muiTheme}})
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

describe('Default states, styles, and behaviors', () => {
  it('renders without crashing', () => {
    const root = document.createElement('div')
    render(
      <MuiThemeProvider>
        <SuperSelectField />
      </MuiThemeProvider>
    , root)
  })

  it('expects the menu to be closed by default', () => {
    const wrapper = shallowWithContext(<SuperSelectField />)
    const menu = wrapper.find('Popover')
    expect(menu.props().open).toBe(false)
    // can also use wrapper.state('isOpen')
  })

  it('expects the menu to open when clicked', () => {
    const wrapper = shallowWithContext(<SuperSelectField />)
    wrapper.simulate('click')
    expect(wrapper.find('Popover').props().open).toBe(true)
  })

  it('expects the menu to render children', () => {
    const wrapper = shallowWithContext(<SuperSelectField>{testChildren}</SuperSelectField>)
    wrapper.simulate('click') // opens menu
    const firstChild = wrapper.find('MenuItem').first()
    expect(firstChild.props().primaryText).toBe(testChildren[0])
  })

  it('should display [hintText] when nothing selected')

  it('should pass the default selected item to the underlying MenuItem')
})

describe('When selecting an option', () => {
  it('expects the menu to close', () => {
    const wrapper = shallowWithContext(<SuperSelectField>{testChildren}</SuperSelectField>)
    wrapper.simulate('click') // opens menu
    const children = wrapper.find('MenuItem')
    expect(children).toHaveLength(2)
    children.first().simulate('touchTap')
    console.log('children', children)
    // expect(wrapper.find('Popover').props().open).toBe(false)
  })

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
  it('should show if more than [showAutocompleteThreshold] items')

  it('should display the default [hintTextAutocomplete]')

  it('should display the custom [hintTextAutocomplete]')

  it('use the default case insensitive filter properly')

  it('executes custom filter function properly')

  it('should display `No match` when the filter returns null')
})

describe('Selections presenter', () => {
  it('should display the default [hintText]')

  it('should display custom [hintText] properly')

  it('use the default selection renderer properly')

  it('executes custom selection renderer function properly')

  it('')
})

describe('Focus and keystrokes handling', () => {})

/*
describe('', () => {
  it('')

  it('')
})
*/
