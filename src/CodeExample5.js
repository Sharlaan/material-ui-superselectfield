import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress/CircularProgress'
import SuperSelectField from './SuperSelectField'
import data from './assets/states'

class CodeExample extends Component {
  state = {
    isFetchingStates: true,
    isFetchingCounties: false,
    selectedStates: [],
    stateNodes: [],
    selectedCounties: [],
    countyNodes: []
  }

  componentDidMount = () => {
    this.setState({ isFetchingStates: true })

    // Ideally should be externalized in a HoC,
    // with stateNodes && countyNodes in props
    window.setTimeout(() => {
      const stateNodes = data.states.map(({code, name, capital}) =>
        <div key={code} value={name}>{name}</div>
      )
      this.setState({ stateNodes, isFetchingStates: false })
      console.log('States updated')
    }, 5000) // simulates a 5secs fetch delay
  }

  handleStateSelection = (selectedStates, name) => {
    console.debug('selectedStates', selectedStates)
    this.setState({ selectedStates, isFetchingCounties: true }, () => {
      const countyNodes = data.counties
        .reduce((nodes, {INCITS, county, state}) => {
          if (!selectedStates.find(({value}) => value === state)) return nodes
          return [ ...nodes, <div key={INCITS} value={county}>{county}</div> ]
        }, [])
      // must also check if previous selections are still consistent with new selectedStates
      const selectedCounties = this.state.selectedCounties.filter(({value}) =>
        countyNodes.find(node => node.props.value === value)
      )

      window.setTimeout(() => {
        this.setState({ countyNodes, selectedCounties, isFetchingCounties: false })
        console.log('Counties updated')
      }, 3000) // simulates a 3secs fetch delay
    })
  }

  handleCountySelection = (selectedCounties, name) => this.setState({ selectedCounties })

  selectionsRenderer = (values, hintText, name) => {
    const { isFetchingStates, isFetchingCounties } = this.state

    switch (name) {
      case 'states':
        if (isFetchingStates) {
          return <div>
            <CircularProgress size={20} style={{marginRight: 10}}/>
            {hintText}
          </div>
        }
        break
      case 'counties':
        if (isFetchingCounties) {
          return <div>
            <CircularProgress size={20} style={{marginRight: 10}}/>
            {hintText}
          </div>
        }
        break
      default:
    }

    if (!values) return hintText
    const { value, label } = values
    if (Array.isArray(values)) {
      return values.length
      ? values.map(({ value, label }) => label || value).join(', ')
      : hintText
    }
    else if (label || value) return label || value
    else return hintText
  }

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
            selectionsRenderer={(values, hintText) => this.selectionsRenderer(values, hintText, 'states')}
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
            selectionsRenderer={(values, hintText) => this.selectionsRenderer(values, hintText, 'counties')}
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
