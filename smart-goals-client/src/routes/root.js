import { Outlet } from 'react-router-dom'
import AuthStatus from '../auth_status'

export default function Root() {
  return (
    <>
      <header>
        <AuthStatus />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
