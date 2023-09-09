import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { useState } from 'react'

export default function Login() {
  const { signin } = useAuth()
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const navigation = useNavigation()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/goals'

  const isLoggingIn = navigation.formData?.get('username') != null

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    if (!username) {
      return {
        error: 'You must provide a username to log in',
      }
    }

    if (!password) {
      return {
        error: 'You must provide a password to log in',
      }
    }

    signin({ username, password })
      .then(() => {
        navigate(from, { replace: true })
      })
      .catch((error) => console.error(error))
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" autoComplete="username" />
        </label>{' '}
        <label>
          Password: <input name="password" type="password" autoComplete="current-password"></input>
        </label>{' '}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      </form>
      <Link to='/signup'>No account? Sign up</Link>
    </div>
  )
}
