import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useEffect, useRef, useState } from 'react'

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef()
  const { signup } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData)

    setIsSubmitting(true)
    try {
      await signup(userData)
      navigate('/goals', { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="auth-form">
        <h1 className="fs-4">Sign up</h1>
        <Form.Group as="section" className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required ref={ref} name="username" autoComplete="username" />
        </Form.Group>
        <Form.Group as="section" className="mb-3" controlId="new-password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" name="password" autoComplete="new-password" />
        </Form.Group>
        <Button variant="primary" disabled={isSubmitting} type="submit" className="me-2">
          Sign up
        </Button>
      </Form>
      <p className="text-center mt-4 text-secondary">
        <span>
          Already have an account? <Link to="/signin">Sign in</Link>
        </span>
      </p>
    </>
  )
}
