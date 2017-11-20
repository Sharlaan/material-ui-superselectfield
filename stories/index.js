import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { muiTheme } from 'storybook-addon-material-ui'
import SuperSelectField from '../src'
import welcome from './welcome'
import { multiple, multipleWithClose } from './multiple'
import customStyle from './customStyle'
import autocomplete from './autocomplete'
import optionsGrouping from './optionsGrouping'

storiesOf('Welcome', module).addDecorator(muiTheme()).add('to SuperSelectField', welcome)

storiesOf('SuperSelectField', module)
  .addDecorator(muiTheme())

  .add('No child', () =>
    <SuperSelectField
      style={{ width: 300, margin: 20 }}>
    </SuperSelectField>)
  .add('Single child', () =>
    <SuperSelectField
      style={{ width: 300, margin: 20 }}>
      <span value={1} label='Option 1'>Option 1</span>
    </SuperSelectField>)
  .add('Error text', () =>
    <SuperSelectField
      errorText='Error text warning something is wrong!'
      style={{ width: 300, margin: 20 }}>
      <span value={1} label='Option 1'>Option 1</span>
      <span value={2} label='Option 2'>Option 2</span>
    </SuperSelectField>)
  .add('Disabled', () =>
    <SuperSelectField
      hintText='Disabled'
      disabled={true}
      style={{ width: 300, margin: 20 }}>
    </SuperSelectField>)
  .add('Floating label', () =>
    <SuperSelectField
      floatingLabel='Floating label'
      style={{ width: 300, margin: 20 }}>
      <span value={1} label='Option 1'>Option 1</span>
      <span value={2} label='Option 2'>Option 2</span>
      <span value={3} label='Option 3'>Option 3</span>
    </SuperSelectField>)
  .add('Empty groups', () =>
    <SuperSelectField
      hintText='Empty groups'
      style={{ width: 300, margin: 20 }}>
      <optgroup label='Group A'>
      </optgroup>
      <optgroup label='Group B'>
      </optgroup>
    </SuperSelectField>)
  .add('Multiple', multiple)
  .add('Multiple with close button', multipleWithClose)
  .add('Autocomplete', autocomplete)
  .add('Custom styling', customStyle)
  .add('Options grouping', optionsGrouping)
