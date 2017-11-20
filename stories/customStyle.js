import React from 'react'
import { teal500, pink500, teal200, pink200, yellow500, yellow200, deepPurple500 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import SuperSelectField from '../src'

const dataSource = [
  { id: 0, name: 'Raphaël' },
  { id: 1, name: 'Jessica' },
  { id: 2, name: 'Naomie' },
  { id: 3, name: 'Oliver' },
  { id: 4, name: 'Wynona' },
  { id: 5, name: 'Ben' },
  { id: 6, name: 'Vincent' },
  { id: 7, name: 'Clémentine' },
  { id: 8, name: 'Angélique' },
  { id: 9, name: 'Julien' },
  { id: 10, name: 'Steve' },
  { id: 11, name: 'Yoan' },
  { id: 12, name: 'Nathalie' },
  { id: 13, name: 'Marie' },
  { id: 14, name: 'Renée' }
]

const CustomFloatingLabel = (
  <span>
    Custom floatingLabel<br />
    <span style={{ color: deepPurple500, fontWeight: 'bold', fontStyle: 'italic' }}>
      state32
    </span>
  </span>
)

const dataSourceNodes = dataSource.map(({ id, name }) => (
  <div key={id} value={id} label={name}>{name}</div>
))

export default () => <div>
  <SuperSelectField
    multiple
    floatingLabel={CustomFloatingLabel}
    floatingLabelStyle={{ color: pink200 }}
    floatingLabelFocusStyle={{ color: pink500 }}
    underlineStyle={{ borderColor: teal200 }}
    underlineFocusStyle={{ borderColor: teal500 }}
    autocompleteUnderlineStyle={{ borderColor: yellow200 }}
    autocompleteUnderlineFocusStyle={{ borderColor: yellow500 }}
    hintText='Simple example'
    // onChange={this.handleSelection}
    // onAutoCompleteTyping={this.handleAutoCompleteTyping}
    hoverColor='rgba(3, 169, 244, 0.15)'
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    style={{ width: 300, margin: 30, marginTop: 60 }}
    menuCloseButton={<FlatButton label='close' hoverColor={'lightSalmon'} />}
  >
    {dataSourceNodes}
  </SuperSelectField>
</div>
