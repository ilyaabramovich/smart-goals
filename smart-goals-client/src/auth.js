export async function signIn(username, password) {
  let response
  try {
    response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
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

export async function signUp(username, password, passwordConfirmation) {
  let response
  try {
    response = await fetch(`http://localhost:3000/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, passwordConfirmation }),
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
