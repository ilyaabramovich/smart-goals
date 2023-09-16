import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/navigation'

export default function Layout() {
  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">SMART goals</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navigation />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Container className="mt-2">
          <Outlet />
        </Container>
      </main>
    </>
  )
}
