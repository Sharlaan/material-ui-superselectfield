import React from 'react'
import css from './welcome.css'

export default () => <div>
  <div style={{ textAlign: 'center', paddingTop: 50, paddingBottom: 50, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
    <h1>SuperSelectField</h1>
    <h2>A Material-UI based dropdown component</h2>
  </div>
  <div style={{ padding: 40 }}>
    <h2 style={{ marginTop: 0 }}>Features</h2>
    <ul>
      <li style={{ marginBottom: 20 }}>
        <b style={{ display: 'block', marginBottom: 5 }}>Multiple :</b>
        You can use SuperSelectField as simple dropdown (default),<br />or as a multi-selections select.
      </li>
      <li style={{ marginBottom: 20 }}>
        <b style={{ display: 'block', marginBottom: 5 }}>Autocomplete :</b>
        Past a configurable treshold (<i>showAutocompleteThreshold</i>, default: 10), an Autocomplete input will help you find your selection faster.<br />
        SuperSelectField exposes <i>autocompleteFilter</i> property to let you provide your own filtering logic (default: case insensitive).
      </li>
      <li style={{ marginBottom: 20 }}>
        <b style={{ display: 'block', marginBottom: 5 }}>Options grouping :</b>
        You can use <i>&lt;optgroup/&gt;</i> HTML tags as children, they will be automatically detected and integrated into the menu.
      </li>
      <li style={{ marginBottom: 20 }}>
        <b style={{ display: 'block', marginBottom: 5 }}>Infinite loading :</b>
        To enhance UX when dealing with a huge children list, SuperSelectField will render only displayable children (<i>nb2show</i>, default: 5).
      </li>
      <li style={{ marginBottom: 20 }}>
        <b style={{ display: 'block', marginBottom: 5 }}>Styling and composability :</b>
        Along with ability to use any HTML tags as children, most SuperSelectField's inner components expose a styling prop.<br />
        Selected options can also be displayed in the main input following your own provided styling thanks to <i>selectionsRenderer</i>.
      </li>
    </ul>
  </div>
</div >