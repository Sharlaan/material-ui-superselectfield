import React from 'react'
import './Home.css'

export default () => (
  <section className='home'>
    <h2>Features</h2>
    <ul>
      <li>
        <b>Multiple :</b>
        You can use SuperSelectField as simple dropdown (default),<br/>or as a multi-selections select.
      </li>
      <li>
        <b>Autocomplete :</b>
        Past a configurable treshold (<i>showAutocompleteThreshold</i>, default: 10), an Autocomplete input will help you find your selection faster.<br/>
        SuperSelectField exposes <i>autocompleteFilter</i> property to let you provide your own filtering logic (default: case insensitive).
      </li>
      <li>
        <b>Options grouping :</b>
        You can use <i>&lt;optgroup/&gt;</i> HTML tags as children, they will be automatically detected and integrated into the menu.
      </li>
      <li>
        <b>Infinite loading :</b>
        To enhance UX when dealing with a huge children list, SuperSelectField will render only displayable children (<i>nb2show</i>, default: 5).
      </li>
      <li>
        <b>Styling and composability :</b>
        Along with ability to use any HTML tags as children, most SuperSelectField's inner components expose a styling prop.<br/>
        Selected options can also be displayed in the main input following your own provided styling thanks to <i>selectionsRenderer</i>.
      </li>
    </ul>
  </section>
)
