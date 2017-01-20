import React, { Component } from 'react'
import SuperSelectField from './SuperSelectField'
import Chip from 'material-ui/Chip/Chip'
import DropDown from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import countries from './countries'
import flagIconCSSCountryCodes from './flagIconCSSCountryCodes'
import FontIcon from 'material-ui/FontIcon/FontIcon'
import Avatar from 'material-ui/Avatar/Avatar'
import './flag-icon.css'

const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1
}
const menuItemStyle = {
  whiteSpace: 'normal',
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: 'normal'
}

const chipAvatarStyle = {
  width: '100%',
  height: '100%',
  margin: 0,
  borderRadius: '50%',
  backgroundSize: 'cover'
}

class CodeExample extends Component {
  componentWillMount () {
    this.setState({
      value1: '',
      value2: [],
      value3: [],
      value4: 'K'
    })
  }

  handleSelection = (values, name) => this.setState({ [name]: values })

  handleDropDownChange = (event, index, value) => this.setState({ value4: value })

  handleCustomDisplaySelections = (name) => (values) => {
    return values.length
      ? <div style={{display: 'flex', flexWrap: 'wrap'}}>{values.map((country, index) => (
          <Chip key={index} style={{margin: 5}} onRequestDelete={this.onRequestDelete(index, name)}>
            <Avatar icon={(
              <FontIcon
                className={`flag-icon flag-icon-${country['Alpha-2 code'].toLowerCase()}`}
                style={chipAvatarStyle}
              />)}
            />
            {country['English short name']}
          </Chip>))}
        </div>
      : 'select some values'
  }

  onRequestDelete = (key, name) => (event) => {
    this.setState({ [name]: this.state[name].filter((v, i) => i !== key) })
  }

  render () {
    const countriesNodeList = countries.map((c, i) => {
      const countryCode = c['Alpha-2 code'].toLowerCase()
      const countryLabel = c['English short name']
      if (!flagIconCSSCountryCodes.includes(countryCode)) return null
      return (
        <div key={i} value={c} label={countryLabel} style={menuItemStyle}>
          <div>
            <span style={{ fontWeight: 'bold' }}>{countryLabel}</span><br />
            <span style={{ fontSize: 12 }}>{c.Capital}</span>
          </div>
          <FontIcon className={`flag-icon flag-icon-${countryCode}`} />
        </div>
      )
    })

    return <section style={containerStyle}>

      <h4>Basic dropdowns</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SuperSelectField
          name='value1'
          hintText='Single value'
          onSelect={this.handleSelection}
          value={this.state.value1}
          style={{ minWidth: 150, marginRight: 40 }}
        >
          <div value='A' label='A'>Option A</div>
          <div value='B' label='B'>Option B</div>
          <div value='C' label='C'>Option C</div>
        </SuperSelectField>

        <SuperSelectField
          name='value2'
          multiple
          hintText='Multiple values'
          onSelect={this.handleSelection}
          value={this.state.value2}
          style={{ minWidth: 150 }}
        >
          <div value='D'>Option D</div>
          <div value='E'>Option E</div>
          <div value='F'>Option F</div>
        </SuperSelectField>
      </div>

      <h4 style={{ marginTop: 80 }}>Composability example</h4>
      <SuperSelectField
        name='value3'
        multiple
        hintText='Type some letters ...'
        onSelect={this.handleSelection}
        value={this.state.value3}
        displaySelectionsRenderer={this.handleCustomDisplaySelections('value3')}
        menuProps={{maxHeight: 370}}
        style={{ width: 300 }}
      >
        {countriesNodeList}
      </SuperSelectField>

      <h4 style={{ marginTop: 80 }}>Original Material-UI DropDown</h4>
      <DropDown
        name='value4'
        onChange={this.handleDropDownChange}
        value={this.state.value4}
        style={{ minWidth: 150 }}
      >
        <MenuItem value='J' primaryText='Option J' />
        <MenuItem value='K' primaryText='Option K' />
        <MenuItem value='L' primaryText='Option L' />
      </DropDown>

      <fieldset style={{ marginTop: 40 }}>
        <legend>State values</legend>
        <div>State 1: {this.state.value1}</div>
        <div>State 2: {this.state.value2.join(', ')}</div>
        <div>State 3: {this.state.value3.map(obj => obj['English short name']).join(', ')}</div>
        <div>State 4: {this.state.value4}</div>
      </fieldset>

    </section>
  }
}

export default CodeExample
