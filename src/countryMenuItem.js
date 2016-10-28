import React from 'react'
import FontIcon from 'material-ui/FontIcon/FontIcon'
import './flag-icon.css'

const menuItemStyle = { whiteSpace: 'normal', display: 'flex', justifyContent: 'space-between' }

export default ({countryCode, countryLabel}) => (
  <div value={countryCode} label={countryLabel} style={menuItemStyle}>
    <div>{countryLabel}</div>
    <FontIcon className={`flag-icon flag-icon-${countryCode}`} />
  </div>
)
