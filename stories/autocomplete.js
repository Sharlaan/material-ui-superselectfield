import SuperSelectField from '../src'
import React from 'react'
import countries from './assets/countries'
import flagIconCSSCountryCodes from './assets/flagIconCSSCountryCodes'
import FontIcon from 'material-ui/FontIcon/FontIcon'

const menuItemStyle = {
  whiteSpace: 'normal',
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: 'normal'
}

const handleCustomDisplaySelections = name => values => values.length
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

export default () =>
  <SuperSelectField
    multiple
    floatingLabel='floatingLabelText'
    hintText='Complex example'
    elementHeight={58}
    // selectionsRenderer={handleCustomDisplaySelections('state31')}
    style={{ width: 300, margin: 20 }}
  >
    {countriesNodeList}
  </SuperSelectField>
