import { NavLink, useMatch, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'

export default function Navigation() {
  const { isLoggedIn, signout, user } = useAuth()
  const navigate = useNavigate()
  const match = useMatch('/')

  const handleSignOut = () => {
    signout()
      .then(() => navigate('/'))
      .catch((err) => console.error(err))
  }

  if (!isLoggedIn) {
    if (!match) {
      return null
    }

    return (
      <NavLink className="ms-auto" to="/signin">
        Sign in
      </NavLink>
    )
  }

  return (
    <>
      <NavLink className="me-auto" to="/goals">
        My goals
      </NavLink>
      <span className="me-2">Signed in as: {user.username}</span>
      <NavLink className="ms-auto" onClick={handleSignOut}>
        Sign out
      </NavLink>
    </>
  )
}
