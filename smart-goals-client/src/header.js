import { NavLink } from 'react-router-dom'
import { useAuth } from './context/auth'
import AuthStatus from './auth_status'

export default function Header() {
  const auth = useAuth()
  
  return (
    <header>
      {auth?.user && <nav><NavLink to='/goals'>My goals</NavLink></nav>}
      <AuthStatus/>
    </header>
  )
}
