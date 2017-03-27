import React, { Component } from 'react'
import SuperSelectField from './SuperSelectField'
import data from './assets/states'

class CodeExample extends Component {
  state = {
    selectedStates: [],
    stateNodes: [],
    selectedCounties: [],
    countyNodes: []
  }

  componentDidMount = () => {
    // Ideally should be externalized in a HoC,
    // with stateNodes && countyNodes in props
    window.setTimeout(() => {
      const stateNodes = data.states.map(({code, name, capital}) =>
        <div key={code} value={name}>{name}</div>
      )
      this.setState({ stateNodes })
      console.log('States updated')
    }, 5000)
  }

  handleStateSelection = (selectedStates, name) => {
    console.debug('selectedStates', selectedStates)
    this.setState({ selectedStates }, () => {
      const countyNodes = data.counties
        .reduce((nodes, {INCITS, county, state}) => {
          if (!selectedStates.find(({value}) => value === state)) return nodes
          return [ ...nodes, <div key={INCITS} value={county}>{county}</div> ]
        }, [])
      // must also check if previous selections are still consistent with new selectedStates
      const selectedCounties = this.state.selectedCounties.filter(({value}) =>
        countyNodes.find(node => node.props.value === value)
      )
      this.setState({ countyNodes, selectedCounties })
      console.log('Counties updated')
    })
  }

  handleCountySelection = (selectedCounties, name) => this.setState({ selectedCounties })

  render () {
    const { selectedStates, stateNodes, selectedCounties, countyNodes } = this.state

    console.debug('countyNodes', countyNodes)

    return (
      <section style={{ margin: 40 }}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SuperSelectField
            name='states'
            hintText='Select a state...'
            multiple
            value={selectedStates}
            onChange={this.handleStateSelection}
            checkPosition='left'
            style={{ width: 300, marginRight: 60 }}
          >
            {stateNodes}
          </SuperSelectField>

          <SuperSelectField
            name='counties'
            hintText='Select a county...'
            multiple
            value={selectedCounties}
            onChange={this.handleCountySelection}
            checkPosition='left'
            style={{ width: 300 }}
          >
            {countyNodes}
          </SuperSelectField>
        </div>

      </section>
    )
  }
}

export default CodeExample
