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

const displayState = state => state.length
  ? [...state].map(({ value, label }) => label || value).join(', ')
  : 'empty state'

class CodeExample extends Component {
  componentWillMount () {
    this.state = {
      state3: [{ value: 'H' }]
    }
  }

  handleSelection = (values, name) => this.setState({ [name]: values })

  render () {
    const { state3 } = this.state
    console.debug('state3', state3)

    return <section style={containerStyle}>

      <fieldset style={{ marginBottom: 40 }}>
        <legend>Selected values</legend>
        <div>State 3: {displayState(state3)}</div>
      </fieldset>

      <SuperSelectField
        name='state3'
        multiple
        hintText='Multiple values'
        onChange={this.handleSelection}
        value={state3}
        style={{ minWidth: 150, display: 'block' }}
      >
        <div value='G'>Option G</div>
        <div value='H'>Option H</div>
        <div value='I'>Option I</div>
      </SuperSelectField>

    </section>
  }
}

export default CodeExample
