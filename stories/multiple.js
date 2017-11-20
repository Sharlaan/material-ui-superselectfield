import React from 'react'
import SuperSelectField from '../src'
import FlatButton from 'material-ui/FlatButton'

export const multiple = () => <SuperSelectField
  multiple
  checkPosition='left'
  style={{ width: 300, margin: 20 }}
  hintText='Multiple values'>
  <div value='G'>Option G</div>
  <div value='H'>Option H super long</div>
  <div value='I'>Option I</div>
</SuperSelectField>

export const multipleWithClose = () => <SuperSelectField
  multiple
  checkPosition='right'
  hintText='Multiple values'
  style={{ width: 300, margin: 20 }}
  menuCloseButton={<FlatButton label='close' hoverColor={'lightSalmon'} />}>
  <div value='G'>Option G</div>
  <div value='H'>Option H super longue</div>
  <div value='I'>Option I</div>
</SuperSelectField>
