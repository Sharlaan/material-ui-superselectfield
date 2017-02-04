import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './App'

import Home from './Home'
import CodeExample1 from './CodeExample1'
import CodeExample2 from './CodeExample2'
import CodeExample3 from './CodeExample3'
import CodeExample4 from './CodeExample4'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='example1' component={CodeExample1} />
    <Route path='example2' component={CodeExample2} />
    <Route path='example3' component={CodeExample3} />
    <Route path='example4' component={CodeExample4} />
  </Route>
)
