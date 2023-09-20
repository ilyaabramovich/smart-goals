import { Link } from 'react-router-dom'
import Navigation from '../components/navigation'

export default function Header() {
  return (
    <header>
      <nav className="bg-body-tertiary">
        <Link to="/">SMART goals</Link>
        <Navigation />
      </nav>
    </header>
  )
}
