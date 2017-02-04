import React from 'react'
import Link from './Link'
import Drawer from 'material-ui/Drawer/Drawer'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import logo from './assets/logo.svg'
import './App.css'

export default ({ children }) => (
  <div className='App'>

    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>SuperSelectField</h2>
      <h4>a Material-UI based dropdown component</h4>
    </div>

    <section className='App-content'>{children}</section>

    <Drawer open width={200}>
      <h3 style={{ textAlign: 'center' }}>
        <Link to='/' activeClassName='' label='Demos' style={{ paddingLeft: 0 }} />
      </h3>
      <MenuItem>
        <Link to='/example1' label='Basic' />
      </MenuItem>
      <MenuItem>
        <Link to='/example2' label='Multiple' />
      </MenuItem>
      <MenuItem>
        <Link to='/example3' label='Autocomplete' />
      </MenuItem>
      <MenuItem>
        <Link to='/example4' label='Options grouping' />
      </MenuItem>
    </Drawer>

  </div>
)
