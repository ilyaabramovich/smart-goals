import { useEffect, useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'

export default function SignIn() {
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData)

    setError(null)
    setIsSubmitting(true)
    try {
      await signin(userData)
      navigate(from, { replace: true })
    } catch (error) {
      setError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="auth-form">
        <h1 className="fs-4 mb-4">Sign in</h1>
        <Form.Group as="section" className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required ref={ref} name="username" autoComplete="username" />
        </Form.Group>
        <Form.Group as="section" className="mb-3 position-relative" controlId="current-password">
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
          <Form.Control
            required
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
          />
        </Form.Group>
        <Button disabled={isSubmitting} variant="primary" type="submit" className="me-2">
          Sign in
        </Button>
        {error && (
          <Alert className="mt-4" variant="danger">
            {error.message}
          </Alert>
        )}
      </Form>
      <p className="text-center mt-4 text-secondary">
        <span>
          Do not have an account yet? <Link to="/signup">Sign up</Link>
        </span>
      </p>
    </>
  )
}
