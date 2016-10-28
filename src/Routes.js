import React from 'react'
import { Route } from 'react-router'
import App from './App'

import CodeExample1 from './CodeExample1'
import CodeExample2 from './CodeExample2'

export default (
  <Route path='/' component={App}>
    <Route path='example1' component={CodeExample1} />
    <Route path='example2' component={CodeExample2} />
  </Route>
)
