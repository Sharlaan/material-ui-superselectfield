import React from 'react'
import Link from 'react-router-dom/Link'
import NavLink from 'react-router-dom/NavLink'
import Drawer from 'material-ui/Drawer/Drawer'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import './Nav.css'

export default () => (
  <Drawer open width={200}>
    <h3 className='title'>
      <Link to='/' className='base verticallyCenter'>Demos</Link>
    </h3>
    {[
      { route: '/example1', label: 'Basic' },
      { route: '/example2', label: 'Multiple' },
      { route: '/example3', label: 'Autocomplete' },
      { route: '/example4', label: 'Options grouping' },
      { route: '/example5', label: <span className='multiLine'>Asynchronous loading</span> }
    ].map(({ route, label }) => (
      <MenuItem
        key={route}
        style={{ whiteSpace: 'normal' }}
        innerDivStyle={{ padding: 0 }}
      >
        <NavLink to={route} className='base morePadding'>{label}</NavLink>
      </MenuItem>
    ))}
  </Drawer>
)
