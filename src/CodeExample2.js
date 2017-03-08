import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton/FlatButton'
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
  state = {
    state21: [{ value: 'H' }],
    state22: [{ value: 'I' }],
    state23: [{ value: 'G' }]
  }

  handleSelection = (values, name) => this.setState({ [name]: values })

  render () {
    const { state21, state22, state23 } = this.state
    console.debug('state21', state21, '\nstate22', state22, '\nstate23', state23)

    return <section style={containerStyle}>

      <fieldset style={{ marginBottom: 40 }}>
        <legend>Selected values</legend>
        <div>State 21: {displayState(state21)}</div>
        <div>State 22: {displayState(state22)}</div>
        <div>State 23: {displayState(state23)}</div>
      </fieldset>

      <div style={{ display: 'flex' }}>
        <SuperSelectField
          name='state21'
          multiple
          checkPosition='left'
          hintText='Multiple values'
          onChange={this.handleSelection}
          value={state21}
          style={{ minWidth: 150, marginRight: 40 }}
          elementHeight={[36, 68, 36]}
        >
          <div value='G'>Option G</div>
          <div value='H'>Option H super longue</div>
          <div value='I'>Option I</div>
        </SuperSelectField>

        <SuperSelectField
          name='state22'
          multiple
          checkPosition='right'
          unCheckedIcon={null}
          hintText='Multiple values'
          onChange={this.handleSelection}
          value={state22}
          style={{ minWidth: 150, marginRight: 40 }}
          elementHeight={[36, 68, 36]}
          menuCloseButton={<FlatButton label='close' hoverColor={'lightSalmon'} />}
        >
          <div value='G'>Option G</div>
          <div value='H'>Option H super longue</div>
          <div value='I'>Option I</div>
        </SuperSelectField>

        <SuperSelectField
          name='state23'
          multiple
          hintText='Multiple values'
          onChange={this.handleSelection}
          value={state23}
          style={{ minWidth: 150 }}
          elementHeight={[36, 52, 36]}
          menuFooterStyle={{ width: '100%' }}
          menuCloseButton={<FlatButton label='close' hoverColor={'lightSalmon'} style={{ width: '100%' }} />}
        >
          <div value='G'>Option G</div>
          <div value='H'>Option H super longue</div>
          <div value='I'>Option I</div>
        </SuperSelectField>
      </div>

    </section>
  }
}

export default CodeExample
