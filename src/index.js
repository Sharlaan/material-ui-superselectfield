import React from 'react'
import { render } from 'react-dom'
import { blueGrey500, blueGrey700, lightBlue500, deepOrange400 } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Router from 'react-router/lib/Router'
import hashHistory from 'react-router/lib/hashHistory'
import './index.css'
import Routes from './Routes'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const customTheme = getMuiTheme({
  fontFamily: 'Raleway, sans-serif',
  palette: {
    primary1Color: lightBlue500,
    accent1Color: deepOrange400,
    textColor: blueGrey700
  },
  checkbox: {
    checkedColor: deepOrange400,
    boxColor: blueGrey500
  },
  svgIcon: {
    color: blueGrey500
  }
})

render(
  <MuiThemeProvider muiTheme={customTheme}>
    <Router history={hashHistory} routes={Routes} />
  </MuiThemeProvider>,
  document.getElementById('root')
)
