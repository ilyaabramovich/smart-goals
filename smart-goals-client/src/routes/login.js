import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useAuth } from '../context/auth'

export default function Login() {
  const { signin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/goals'

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
    <Container className='mt-2'>
      <Row lg={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formLoginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" autoComplete="username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" autoComplete="current-password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Login
          </Button>
          <Link to="/signup" className="align-middle link-underline link-underline-opacity-0">
            Sign up
          </Link>
        </Form>
      </Row>
    </Container>
  )
}
