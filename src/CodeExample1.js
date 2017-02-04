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
  componentWillMount () {
    this.state = {
      state1: { value: '' },
      state2: { value: 'E', label: 'label E' },
      state3: [{ value: 'H' }],
      state4: [{
        label: 'France',
        value: {
          'English short name': 'France',
          'French short name': 'France (la)',
          'Alpha-2 code': 'FR',
          'Alpha-3 code': 'FRA',
          'Numeric': 250,
          'Capital': 'Paris',
          'Continent': 4
        }
      }]
    }
  }

  handleSelection = (values, name) => this.setState({ [name]: values })

  render () {
    const { state1, state2 } = this.state
    console.debug('state1', state1, '\nstate2', state2)

    return <section style={containerStyle}>

      <fieldset style={{ marginBottom: 40 }}>
        <legend>Selected values</legend>
        <div>State 1: {state1.value}</div>
        <div>State 2: {state2.label}</div>
      </fieldset>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SuperSelectField
          name='state1'
          hintText='Single value'
          onChange={this.handleSelection}
          value={state1}
          style={{ minWidth: 150, marginRight: 40 }}
        >
          <div value='A'>Option A</div>
          <div value='B'>Option B</div>
          <div value='C'>Option C</div>
        </SuperSelectField>

        <SuperSelectField
          name='state2'
          hintText='With labels'
          onChange={this.handleSelection}
          value={state2}
          style={{ minWidth: 150 }}
        >
          <div value='D' label='label D'>Option D</div>
          <div value='E' label='label E'>Option E</div>
          <div value='F' label='label F'>Option F</div>
        </SuperSelectField>
      </div>

    </section>
  }
}

export default CodeExample
