import React from 'react';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';
import Drawer from 'material-ui/Drawer/Drawer';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import './Nav.css';

const multiLine = (label) => <span className='multiLine'>{label}</span>;

const navigationRoutes = [
  { route: '/example1', label: 'Basic' },
  { route: '/example2', label: 'Multiple' },
  { route: '/example3', label: 'Autocomplete' },
  { route: '/example4', label: multiLine('Options grouping') },
  {
    route: '/example5',
    label: multiLine('Asynchronous loading'),
  },
];

const Nav = () => (
  <Drawer open width={200} className='drawer'>
    <h3 className='title'>
      <Link to='/' className='base verticallyCenter'>
        Demos
      </Link>
    </h3>
    {navigationRoutes.map(({ route, label }) => (
      <MenuItem key={route} style={{ whiteSpace: 'normal' }} innerDivStyle={{ padding: 0 }}>
        <NavLink to={route} className='base morePadding'>
          {label}
        </NavLink>
      </MenuItem>
    ))}
  </Drawer>
);

export default Nav;
