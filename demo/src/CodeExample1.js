import React, { Component } from 'react';
import SuperSelectField from 'material-ui-superselectfield';
import Toggle from 'material-ui/Toggle';

const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100% - 40px)',
};

const displayState = (state) => (state && state.value ? state.label || state.value : 'empty state');

class CodeExample extends Component {
  state = {
    state11: null,
    state12: { value: 'E', label: 'label E' },
    floatingLabelState: null,
  };

  handleSelection = (values, name) => this.setState({ [name]: values });

  handleDisable = (event, isDisabled) => this.setState({ isDisabled });

  render () {
    const { state11, state12, floatingLabelState, isDisabled } = this.state;
    console.debug('state11', state11, '\nstate12', state12, '\nfloatingLabelState', floatingLabelState); // eslint-disable-line no-console

    return (
      <section style={containerStyle}>
        <fieldset style={{ marginBottom: 40 }}>
          <legend>Selected values</legend>
          <div>State 11: {displayState(state11)}</div>
          <div>State 12: {displayState(state12)}</div>
          <div>State floatingLabel: {displayState(floatingLabelState)}</div>
        </fieldset>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <SuperSelectField
            name='state11'
            hintText='Single value'
            value={state11}
            onChange={this.handleSelection}
            style={{ minWidth: 150, margin: 10 }}
          >
            <div value='A'>Option A</div>
            <div value='B'>Option B</div>
            <div value='C'>Option C</div>
          </SuperSelectField>

          <SuperSelectField
            name='state12'
            hintText='With labels'
            value={state12}
            onChange={this.handleSelection}
            style={{ minWidth: 150, margin: 10 }}
          >
            <div value='D' label='label D'>
              Option D
            </div>
            <div value='E' label='label E'>
              Option E
            </div>
            <div value='F' label='label F'>
              Option F
            </div>
          </SuperSelectField>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 40,
          }}
        >
          <SuperSelectField
            name='floatingLabelState'
            floatingLabel='Floating label'
            value={floatingLabelState}
            onChange={this.handleSelection}
            style={{ minWidth: 150, margin: 10 }}
          >
            <div value='A'>Option A</div>
            <div value='B'>Option B</div>
            <div value='C'>Option C</div>
          </SuperSelectField>

          <article>
            <SuperSelectField
              name='Disabled select'
              disabled={isDisabled}
              floatingLabel={`${isDisabled ? 'Disabled' : 'Active'} select`}
              value={{ value: 'Preserved value' }}
              style={{ minWidth: 150, margin: 10 }}
            />
            <Toggle label='Disable' toggled={isDisabled} onToggle={this.handleDisable} style={{ margin: 10 }} />
          </article>
        </div>

        <div style={{ flex: 1 }} />

        <h3>Edges cases</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <SuperSelectField name='case 1' hintText='No child' style={{ margin: 10 }} />

          <SuperSelectField name='case 2' hintText='Single child' style={{ margin: 10 }}>
            <span value={1} label='Option 1'>
              Option 1
            </span>
          </SuperSelectField>

          <SuperSelectField
            name='case 2bis'
            hintText='Error message'
            errorText='Error text warning something is wrong!'
            style={{ margin: 10 }}
          >
            <span value={1} label='Option 1'>
              Option 1
            </span>
          </SuperSelectField>

          <SuperSelectField name='case 3' hintText='Single empty group' style={{ margin: 10 }}>
            <optgroup label='Group A' />
          </SuperSelectField>

          <SuperSelectField name='case 4' hintText='Multiple empty groups' style={{ margin: 10 }}>
            <optgroup label='Group A' />
            <optgroup label='Group B' />
          </SuperSelectField>

          <SuperSelectField name='case 4bis' hintText='One empty group, and one group+child' style={{ margin: 10 }}>
            <optgroup label='Group A' />
            <optgroup label='Group B'>
              <span value={1} label='Option 1'>
                Option 1
              </span>
            </optgroup>
          </SuperSelectField>

          <SuperSelectField
            name='case 5'
            multiple
            value={[]}
            hintText='Single child in single group'
            style={{ margin: 10 }}
          >
            <optgroup label='Group A'>
              <span value={1} label='Option 1'>
                Option 1
              </span>
            </optgroup>
          </SuperSelectField>

          <SuperSelectField
            name='case 6'
            multiple
            value={[]}
            hintText='Children in single group'
            style={{ margin: 10 }}
          >
            <optgroup label='Group A'>
              <span value={1} label='Option 1'>
                Option 1
              </span>
              <span value={2} label='Option 2'>
                Option 2
              </span>
            </optgroup>
          </SuperSelectField>
        </div>
      </section>
    );
  }
}

export default CodeExample;
