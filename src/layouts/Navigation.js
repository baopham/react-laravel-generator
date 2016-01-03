import React from 'react'
import { Nav, Navbar } from 'react-bootstrap/lib'
import { IndexLink, Link } from 'react-router'

export default class Navigation extends React.Component {
  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to='/'>Laravel Generator</IndexLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <li>
            <Link to='/migration'>Migration</Link>
          </li>
        </Nav>
      </Navbar>
    )
  }
}
