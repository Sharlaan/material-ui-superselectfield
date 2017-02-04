import React from 'react'
import Link from 'react-router/lib/Link'
import './Link.css'

export default ({ style, label, to, activeClassName = 'active' }) => (
  <Link to={to} className='base' style={style} activeClassName={activeClassName}>{label}</Link>
)
