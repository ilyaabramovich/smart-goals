import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/auth'

export default function AuthStatus() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    auth.signout().then(() => navigate('/')).catch((err) => console.error(err))
  }

  if (!auth?.user) {
    return <span>You are not logged in.</span>
  }

  return (
    <span>
      Welcome {auth.user.username}! <button onClick={handleSignOut}>Sign out</button>
    </span>
  )
}
