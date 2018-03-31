import React from 'react';
import logo from './assets/logo.svg';
import { version } from '../../package.json';

import './Header.css';

const Version = () => <aside className='version'>{version}</aside>;

const Logo = () => <img src={logo} className='App-logo' alt='logo' />;

const Header = () => (
  <header className='App-header'>
    <Logo />
    <h2>SuperSelectField</h2>
    <h4>a Material-UI based dropdown component</h4>

    <Version />
  </header>
);

export default Header;
