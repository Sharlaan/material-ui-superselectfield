import React, { Component } from 'react'
import SuperSelectField from './SuperSelectField'

const datasource = [
  { id: 1, name: 'name1' },
  { id: 2, name: 'name2' },
  { id: 3, name: 'name3' },
  { id: 4, name: 'name4' }
]

class CodeExample extends Component {
  state = { value: null }

  handleSelection = (value) => this.setState({ value })

  render () {
    const { value } = this.state

    const options = datasource.map(({ id, name }) => (
      <div value={id} key={id} label={name}>
        {name}
      </div>
    ))

    return (
      <section style={{ margin: 40 }}>

        <SuperSelectField
          value={value}
          onChange={this.handleSelection}
          style={{ width: 150 }}
        >
          {options}
        </SuperSelectField>

      </section>
    )
  }
}

export default CodeExample
