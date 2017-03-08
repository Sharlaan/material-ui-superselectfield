import React, { Component } from 'react'
import SuperSelectField from './SuperSelectField'

const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1
}

class CodeExample extends Component {
  state = {
    state11: null,
    state12: { value: 'E', label: 'label E' }
  }

  handleSelection = (values, name) => this.setState({ [name]: values })

  render () {
    const { state11, state12 } = this.state
    console.debug('state11', state11, '\nstate12', state12)

    return <section style={containerStyle}>

      <fieldset style={{ marginBottom: 40 }}>
        <legend>Selected values</legend>
        <div>State 11: {state11 ? state11.value : 'empty state'}</div>
        <div>State 12: {state12 ? state12.label : 'empty state'}</div>
      </fieldset>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SuperSelectField
          name='state11'
          hintText='Single value'
          onChange={this.handleSelection}
          value={state11}
          style={{ minWidth: 150, marginRight: 40 }}
        >
          <div value='A'>Option A</div>
          <div value='B'>Option B</div>
          <div value='C'>Option C</div>
        </SuperSelectField>

        <SuperSelectField
          name='state12'
          hintText='With labels'
          onChange={this.handleSelection}
          value={state12}
          style={{ minWidth: 150 }}
        >
          <div value='D' label='label D'>Option D</div>
          <div value='E' label='label E'>Option E</div>
          <div value='F' label='label F'>Option F</div>
        </SuperSelectField>
      </div>

      <SuperSelectField
        disabled
        hintText='Disabled'
        style={{ minWidth: 150, marginTop: 40 }}
      />

    </section>
  }
}

export default CodeExample
