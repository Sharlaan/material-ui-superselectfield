import React, { Component } from 'react'
import SuperSelectField from './SuperSelectField'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import Chip from 'material-ui/Chip/Chip'
import countries from './assets/countries'
import flagIconCSSCountryCodes from './assets/flagIconCSSCountryCodes'
import FontIcon from 'material-ui/FontIcon/FontIcon'
import Avatar from 'material-ui/Avatar/Avatar'
import { teal500, pink500, teal200, pink200, yellow500, yellow200, deepPurple500 } from 'material-ui/styles/colors'
import './assets/flag-icon.css'

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

const displayState = state => state.length
  ? [...state].map(({ value, label }) => label || value).join(', ')
  : 'empty state'

const dataSource = [
  {id: 0, name: 'Raphaël'},
  {id: 1, name: 'Jessica'},
  {id: 2, name: 'Naomie'},
  {id: 3, name: 'Oliver'},
  {id: 4, name: 'Wynona'},
  {id: 5, name: 'Ben'},
  {id: 6, name: 'Vincent'},
  {id: 7, name: 'Clémentine'},
  {id: 8, name: 'Angélique'},
  {id: 9, name: 'Julien'},
  {id: 10, name: 'Steve'},
  {id: 11, name: 'Yoan'},
  {id: 12, name: 'Nathalie'},
  {id: 13, name: 'Marie'},
  {id: 14, name: 'Renée'}
]

class CodeExample extends Component {
  state = {
    state31: [{
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
    }],
    state32: []
  }

  handleSelection = (values, name) => this.setState({ [name]: values })

  handleCustomDisplaySelections = name => values => values.length
    ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {values.map(({ label, value: country }, index) =>
        <Chip key={index} style={{ margin: 5 }} onRequestDelete={this.onRequestDelete(index, name)}>
          <Avatar icon={(
            <FontIcon
              className={`flag-icon flag-icon-${country['Alpha-2 code'].toLowerCase()}`}
              style={chipAvatarStyle}
            />)}
          />
          {label}
        </Chip>
      )}
    </div>
    : <div style={{ minHeight: 42, lineHeight: '42px' }}>Select some values</div> // advice: use one of <option>s' default height as min-height

  onRequestDelete = (key, name) => event => {
    this.setState({ [name]: this.state[name].filter((v, i) => i !== key) })
  }

  handleAutoCompleteTyping = searchText => console.debug('You typed in AutoComplete :', searchText)

  render () {
    const { state31, state32 } = this.state
    console.debug('state31', state31, '\nstate32', state32)

    const countriesNodeList = countries.map((country, index) => {
      const countryCode = country['Alpha-2 code'].toLowerCase()
      const countryLabel = country['English short name']
      if (!flagIconCSSCountryCodes.includes(countryCode)) return null

      return (
        <div key={index} value={country} label={countryLabel} style={menuItemStyle}>
          <div style={{ marginRight: 10 }}>
            <span style={{ fontWeight: 'bold' }}>{countryLabel}</span><br />
            <span style={{ fontSize: 12 }}>{country.Capital}</span>
          </div>
          <FontIcon className={`flag-icon flag-icon-${countryCode}`} />
        </div>
      )
    })

    const dataSourceNodes = dataSource.map(({id, name}) => (
      <div key={id} value={id} label={name}>{name}</div>
    ))

    const CustomFloatingLabel = (
      <span>
        Custom floatingLabel<br/>
        <span style={{color: deepPurple500, fontWeight: 'bold', fontStyle: 'italic'}}>
          state32
        </span>
      </span>)

    return <section style={containerStyle}>

      <fieldset style={{ marginBottom: 40 }}>
        <legend>Selected values</legend>
        <div>State 31: {displayState(state31)}</div>
        <div>State 32: {displayState(state32)}</div>
      </fieldset>

      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <SuperSelectField
          name='state31'
          multiple
          floatingLabel='floatingLabelText state31'
          hintText='Complex example'
          onChange={this.handleSelection}
          value={state31}
          elementHeight={58}
          selectionsRenderer={this.handleCustomDisplaySelections('state31')}
          style={{ width: 300, marginTop: 20, marginRight: 40 }}
        >
          {countriesNodeList}
        </SuperSelectField>

        <SuperSelectField
          name='state32'
          multiple
          floatingLabel={CustomFloatingLabel}
          floatingLabelStyle={{ color: pink200 }}
          floatingLabelFocusStyle={{ color: pink500 }}
          underlineStyle={{ borderColor: teal200 }}
          underlineFocusStyle={{ borderColor: teal500 }}
          autocompleteUnderlineStyle={{ borderColor: yellow200 }}
          autocompleteUnderlineFocusStyle={{ borderColor: yellow500 }}
          hintText='Simple example'
          onChange={this.handleSelection}
          onAutoCompleteTyping={this.handleAutoCompleteTyping}
          value={state32}
          hoverColor='rgba(3, 169, 244, 0.15)'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          style={{ width: 200, marginTop: 20 }}
          menuCloseButton={<FlatButton label='close' hoverColor={'lightSalmon'} />}
        >
          {dataSourceNodes}
        </SuperSelectField>
      </div>

    </section>
  }
}

export default CodeExample
