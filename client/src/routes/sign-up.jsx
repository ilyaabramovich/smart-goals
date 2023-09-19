import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useEffect, useRef } from 'react'

export default function SignUp() {
  const ref = useRef()
  const { signup } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/goals'

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData)

    signup(userData)
      .then(() => {
        navigate(from, { replace: true })
      })
      .catch((error) => console.error(error))
  }

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <h1 className="fs-4">Sign up</h1>
          <Form.Group as="section" className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control required ref={ref} name="username" autoComplete="username" />
          </Form.Group>
          <Form.Group as="section" className="mb-3" controlId="new-password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" name="password" autoComplete="new-password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Sign up
          </Button>
        </Form>
        <p className="text-center mt-4 text-secondary">
          <span>
            Already have an account? <Link to="/signin">Sign in</Link>
          </span>
        </p>
      </Col>
    </Row>
  )
}
