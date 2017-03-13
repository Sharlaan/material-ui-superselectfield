import React from 'react'
import { Switch } from 'react-router'
import Route from 'react-router-dom/Route'
import logo from './assets/logo.svg'
import './App.css'
import Nav from './Nav'
import Home from './Home'
import CodeExample1 from './CodeExample1'
import CodeExample2 from './CodeExample2'
import CodeExample3 from './CodeExample3'
import CodeExample4 from './CodeExample4'

export default ({ children }) => (
  <div className='App'>

    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>SuperSelectField</h2>
      <h4>a Material-UI based dropdown component</h4>
    </div>

    <Nav />

    <section className='App-content'>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route path='/example1' render={() => <CodeExample1 />} />
        <Route path='/example2' render={() => <CodeExample2 />} />
        <Route path='/example3' render={() => <CodeExample3 />} />
        <Route path='/example4' render={() => <CodeExample4 />} />
      </Switch>
    </section>

  </div>
)
