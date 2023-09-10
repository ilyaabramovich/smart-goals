import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

export default function Signup() {
  const { signup } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/goals'

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    const passwordConfirmation = formData.get('passwordConfirmation')

    signup({ username, password, passwordConfirmation })
      .then(() => {
        navigate(from, { replace: true })
      })
      .catch((error) => console.error(error))
  }

  return (
    <Container className="mt-2">
      <Row lg={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSignupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" autoComplete="username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSignupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" autoComplete="current-password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSignupPasswordConfirmation">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" name="passwordConfirmation" />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Signup
          </Button>
          <Link to="/login" className="align-middle link-underline link-underline-opacity-0">
            Login
          </Link>
        </Form>
      </Row>
    </Container>
  )
}
