import { Outlet } from 'react-router-dom'
import Header from '../components/header'

export default function Layout() {
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  )
}
