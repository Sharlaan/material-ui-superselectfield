import React from 'react'
import Link from './Link'
import Drawer from 'material-ui/Drawer/Drawer'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import logo from './logo.svg'
import './App.css'

export default (props) => (
  <div className='App'>

    <Drawer open width={200}>
      <h3>
        <Link to='/' activeClassName='' label='Projects' />
      </h3>
      <MenuItem>
        <Link to='/example1' label='Example 1' />
      </MenuItem>
      <MenuItem>
        <Link to='/example2' label='Example 2' />
      </MenuItem>
    </Drawer>

    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>Welcome to React</h2>
    </div>

    <section className='App-content'>
      {props.children}
    </section>

  </div>
)
