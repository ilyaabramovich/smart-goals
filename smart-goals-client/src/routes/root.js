import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from '../context/auth'

export default function Root() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    auth
      .signout()
      .then(() => navigate('/'))
      .catch((err) => console.error(err))
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">SMART goals</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {Boolean(auth?.user) && (
              <Nav className="me-auto">
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/goals">
                    My goals
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
            <Nav>
              {auth?.user ? (
                <>
                  <Navbar.Text>Signed in as: {auth.user.username}</Navbar.Text>
                  <Nav.Item>
                    <Nav.Link className="ms-auto" onClick={handleSignOut}>
                      Sign out
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item>
                  <Nav.Link as={NavLink} className="ms-auto" to="/login">
                    Sign in
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  )
}
