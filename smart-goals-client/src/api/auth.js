export async function signIn(userData) {
  let response
  try {
    response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
  } catch (error) {
    console.log('There was an error', error)
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
      throw error
    }
  }
}

export async function signUp(userData) {
  let response
  try {
    response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
  } catch (error) {
    console.log('There was an error', error)
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
      throw error
    }
  }
}

export async function logOut() {
  try {
    await fetch('/logout', { method: 'DELETE' })
  } catch (error) {
    console.log('There was an error', error)
  }
}
