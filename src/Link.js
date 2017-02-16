import React from 'react'
import Link from 'react-router/lib/Link'
import './Link.css'

export default ({ style, label, to, activeClassName = 'active' }) =>
  <Link
    to={to}
    className='base'
    style={{ paddingLeft: 16, ...style }}
    activeClassName={activeClassName}
  >
    {label}
  </Link>
