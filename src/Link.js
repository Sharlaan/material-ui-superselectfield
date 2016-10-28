import React from 'react'
import Link from 'react-router/lib/Link'
import './Link.css'

export default ({ label, to, activeClassName = 'active' }) => (
  <Link to={to} className='base' activeClassName={activeClassName}>{label}</Link>
)
