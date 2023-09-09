import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
      <Container>
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
          <Row className="align-items-center">
            <Col>
              <Button variant="primary" type="submit">
                Signup
              </Button>
            </Col>
            <Col>
              <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  )
}
