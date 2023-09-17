export async function signIn(userData) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  let json
  try {
    if (response) {
      json = await response.json()
      if (response?.ok) {
        return json
      } else {
        throw new Error(json?.error || 'Unexpected error')
      }
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log('There was a SyntaxError', error)
    } else {
      console.log('There was an error', error)
    }
    throw error
  }
}

export async function signUp(userData) {
  const response = await fetch('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  const json = await response.json()
  if (response?.ok) {
    return json
  } else {
    throw new Error(json?.error || 'Unexpected error')
  }
}

export async function logOut() {
  await fetch('/auth/logout', { method: 'DELETE' })
}
