import { Form, redirect, useActionData, useLocation, useNavigation } from 'react-router-dom'
import { signIn } from '../auth'

export async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData()
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

  try {
    await signIn(username, password)
    const redirectTo = formData.get('redirectTo')
    return redirect(redirectTo || '/')
  } catch (error) {
    return {
      error: error.message
    }
  }
}

export default function Login() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/'

  const navigation = useNavigation()
  const isLoggingIn = navigation.formData?.get('username') != null

  const actionData = useActionData()

  return (
    <div>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" autoComplete='username' />
        </label>{' '}
        <label>
          Password: <input name="password" type="password" autoComplete='current-password'></input>
        </label>{' '}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </div>
  )
}
