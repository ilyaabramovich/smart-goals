import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks'

export default function GuestRoute({ children }) {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children ? children : <Outlet />
}
