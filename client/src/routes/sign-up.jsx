import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
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
    const username = formData.get('username')
    const password = formData.get('password')

    signup({ username, password })
      .then(() => {
        navigate(from, { replace: true })
      })
      .catch((error) => console.error(error))
  }

  return (
    <Row lg={4}>
      <Form onSubmit={handleSubmit}>
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
        <Link to="/signin" className="align-middle link-underline link-underline-opacity-0">
          Sign in
        </Link>
      </Form>
    </Row>
  )
}
