import React, { PropTypes } from 'react'
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'

const SelectionsPresenter = ({ value, hintText, displaySelectionsRenderer }) => {
  // TODO: add floatingLabelText
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>{displaySelectionsRenderer(value, hintText)}</div>
        <DropDownArrow />
      </div>

      <hr style={{ width: '100%', margin: 0 }} />

    </div>
  )
}

SelectionsPresenter.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  displaySelectionsRenderer: PropTypes.func,
  hintText: PropTypes.string
}

SelectionsPresenter.defaultProps = {
  hintText: 'Click me',
  // eslint-disable-next-line no-unused-vars
  displaySelectionsRenderer: (value, hintText) => {
    return value.length
      ? typeof value === 'string' ? value : value.join(', ')
      : hintText
  }
}

export default SelectionsPresenter
