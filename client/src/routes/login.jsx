import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useEffect, useRef, useState } from 'react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const ref = useRef()
  const { signin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/goals'

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    signin({ username, password })
      .then(() => {
        navigate(from, { replace: true })
      })
      .catch((error) => console.error(error))
  }

  return (
    <Row lg={4}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control ref={ref} name="username" autoComplete="username" />
        </Form.Group>
        <Form.Group className="mb-3 position-relative" controlId="current-password">
          <Form.Label>Password</Form.Label>
          <button
            className="position-absolute top-0 end-0 p-0 border-0 bg-transparent text-secondary"
            onClick={() => {
              setShowPassword(!showPassword)
            }}
            id="toggle-password"
            type="button"
            aria-label={
              showPassword
                ? 'Hide password.'
                : 'Show password as plain text. Warning: this will display your password on the screen.'
            }
          >{`${showPassword ? 'Hide' : 'Show'} password`}</button>
          <Form.Control type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" />
        </Form.Group>
        <Button variant="primary" type="submit" className="me-2">
          Login
        </Button>
        <Link to="/signup" className="align-middle link-underline link-underline-opacity-0">
          Sign up
        </Link>
      </Form>
    </Row>
  )
}
