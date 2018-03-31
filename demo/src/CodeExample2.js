import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import SuperSelectField from 'material-ui-superselectfield';

const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
};

const displayState = (state) =>
  state && state.length ? [...state].map(({ value, label }) => label || value).join(', ') : 'empty state';

class CodeExample extends Component {
  state = {
    state21: [{ value: 'B' }],
    state22: [{ value: 'F' }],
    state23: [{ value: 'G' }],
    state24: [],
  };

  handleSelection = (values, name) => this.setState({ [name]: values });

  render () {
    const { state21, state22, state23, state24 } = this.state;
    console.debug('state21', state21, '\nstate22', state22, '\nstate23', state23, '\nstate24', state24); // eslint-disable-line no-console

    return (
      <section style={containerStyle}>
        <fieldset style={{ marginBottom: 40 }}>
          <legend>Selected values</legend>
          <div>State 21: {displayState(state21)}</div>
          <div>State 22: {displayState(state22)}</div>
          <div>State 23: {displayState(state23)}</div>
          <div>State 24: {displayState(state24)}</div>
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
            elementHeight={[36, 52, 36]}
          >
            <div value='A'>Option A</div>
            <div value='B'>Option B super longue</div>
            <div value='C'>Option C</div>
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
            elementHeight={[36, 52, 36]}
            menuCloseButton={<FlatButton label='close' hoverColor='lightSalmon' />}
          >
            <div value='D'>Option D</div>
            <div value='E'>Option E super longue</div>
            <div value='F'>Option F</div>
          </SuperSelectField>

          <SuperSelectField
            name='state23'
            multiple
            hintText='Custom close button'
            onChange={this.handleSelection}
            value={state23}
            style={{ minWidth: 150 }}
            elementHeight={[36, 52, 36]}
            menuFooterStyle={{ width: '100%' }}
            menuCloseButton={<FlatButton label='close' hoverColor='lightSalmon' style={{ width: '100%' }} />}
          >
            <div value='G'>Option G</div>
            <div value='H'>Option H super longue</div>
            <div value='I'>Option I</div>
          </SuperSelectField>
        </div>

        <div style={{ display: 'flex' }}>
          <SuperSelectField
            name='state24'
            multiple
            checkPosition='left'
            hintText='Multiple values with onSelect'
            onSelect={this.handleSelection}
            value={state24}
            style={{ minWidth: 150, marginTop: 40 }}
          >
            <div value='J'>Option J</div>
            <div value='K'>Option K</div>
            <div value='L'>Option L</div>
          </SuperSelectField>
        </div>
      </section>
    );
  }
}

export default CodeExample;
