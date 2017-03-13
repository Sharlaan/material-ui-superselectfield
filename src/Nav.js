import React from 'react'
import Link from 'react-router-dom/Link'
import NavLink from 'react-router-dom/NavLink'
import Drawer from 'material-ui/Drawer/Drawer'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import './Nav.css'

export default () => (
  <Drawer open width={200}>
    <h3 style={{ textAlign: 'center', height: 68, margin: 0 }}>
      <Link to='/' className='base' style={{ lineHeight: '68px' }}>Demos</Link>
    </h3>
    {[
      { route: '/example1', label: 'Basic' },
      { route: '/example2', label: 'Multiple' },
      { route: '/example3', label: 'Autocomplete' },
      { route: '/example4', label: 'Options grouping' }
    ].map(({ route, label }) => (
      <MenuItem key={route} innerDivStyle={{ padding: 0 }}>
        <NavLink to={route} className='base' style={{ paddingLeft: 32 }}>{label}</NavLink>
      </MenuItem>
    ))}
  </Drawer>
)
