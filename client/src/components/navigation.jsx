import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'

export default function Navigation() {
  const { isLoggedIn, signout, user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signout()
      .then(() => navigate('/'))
      .catch((err) => console.error(err))
  }

  if (!isLoggedIn) {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link as={NavLink} className="ms-auto" to="/login">
            Sign in
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }

  return (
    <>
      <Nav className="me-auto">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/goals">
            My goals
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
        <Nav.Item>
          <Nav.Link className="ms-auto" onClick={handleSignOut}>
            Sign out
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}
