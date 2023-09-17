import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link, Outlet } from 'react-router-dom'
import Navigation from '../components/navigation'

export default function Layout() {
  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">SMART goals</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navigation />
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Container as='main' className='my-4'>
          <Outlet />
        </Container>
    </>
  )
}
