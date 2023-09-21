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
      <NavLink className="text-sm ml-auto text-gray-500 dark:text-white hover:underline" to="/signin">
        Sign in
      </NavLink>
    )
  }

  return (
    <>
      <NavLink className="text-sm text-gray-500 mr-auto dark:text-white hover:underline" to="/goals">
        My goals
      </NavLink>
      <span className="mr-4 text-sm text-gray-500 dark:text-white">Signed in as: {user.username}</span>
      <NavLink className="text-sm text-gray-500 dark:text-white hover:underline" onClick={handleSignOut}>
        Sign out
      </NavLink>
    </>
  )
}
