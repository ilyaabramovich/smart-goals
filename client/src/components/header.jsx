import { Link } from 'react-router-dom'
import Navigation from '../components/navigation'

export default function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" class="flex items-center mr-6">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SMART goals</span>
          </Link>
          <Navigation />
        </div>
      </nav>
    </header>
  )
}
