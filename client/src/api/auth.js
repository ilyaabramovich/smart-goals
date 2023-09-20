export async function signIn(userData) {
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  if (!res.ok) {
    throw res
  }

  return await res.json()
}

export async function signUp(userData) {
  const res = await fetch('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  if (!res.ok) {
    throw res
  }

  return await res.json()
}

export async function logOut() {
  const res = await fetch('/auth/logout', { method: 'DELETE' })

  if (!res.ok) {
    throw res
  }

  return { ok: true }
}
