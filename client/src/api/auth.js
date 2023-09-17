export async function signIn(userData) {
  let response
  try {
    response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
  } catch (error) {
    throw error
  }
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
  let response
  try {
    response = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
  } catch (error) {
    throw error
  }
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
    throw error
  }
}

export async function logOut() {
  try {
    await fetch('/auth/logout', { method: 'DELETE' })
  } catch (error) {
    throw error
  }
}
