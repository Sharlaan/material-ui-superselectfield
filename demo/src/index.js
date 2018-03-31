import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router-dom/BrowserRouter';
import { blueGrey500, blueGrey700, lightBlue500, deepOrange400 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App';
import './index.css';

const customTheme = getMuiTheme({
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: lightBlue500,
    accent1Color: deepOrange400,
    textColor: blueGrey700,
  },
  checkbox: {
    checkedColor: deepOrange400,
    boxColor: blueGrey500,
  },
  svgIcon: {
    color: blueGrey500,
  },
});

render(
  <MuiThemeProvider muiTheme={customTheme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('demo')
);
