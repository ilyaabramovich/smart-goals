import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { signUp } from '../auth'

export async function signupAction({ request }) {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const passwordConfirmation = formData.get('passwordConfirmation')

  if (!username) {
    return {
      error: 'You must provide a username to sign up',
    }
  }

  if (!password) {
    return {
      error: 'You must provide a password to sign up',
    }
  }

  if (!passwordConfirmation) {
    return {
      error: 'You must provide a password confirmation to sign up',
    }
  }

  if (password !== passwordConfirmation) {
    return {
      error: 'Passwords does not match',
    }
  }

  try {
    await signUp(username, password, passwordConfirmation)
    return redirect('/goals')
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export default function Signup() {
  const navigation = useNavigation()
  const isSigningUp = navigation.formData?.get('username') != null

  const actionData = useActionData()

  return (
    <div>
      <Form method="post" replace>
        <label>
          Username: <input name="username" autoComplete="username" />
        </label>{' '}
        <label>
          Password: <input name="password" type="password" autoComplete="current-password"></input>
        </label>{' '}
        <label>
          Confirm password: <input name="passwordConfirmation" type="password"></input>
        </label>{' '}
        <button type="submit" disabled={isSigningUp}>
          {isSigningUp ? 'Signing up...' : 'Sign up'}
        </button>
        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </div>
  )
}
