import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useEffect, useRef, useState } from 'react'

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef()
  const { signup } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/goals'

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData)

    setIsSubmitting(true)
    try {
      await signup(userData)
      navigate(from, { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto md:w-1/2">
        <h1 className="text-2xl font-bold">Sign up</h1>
        <section className="mb-3" id="username">
          <label>Username</label>
          <input required ref={ref} name="username" autoComplete="username" />
        </section>
        <section className="mb-3" id="new-password">
          <label>Password</label>
          <input required type="password" name="password" autoComplete="new-password" />
        </section>
        <button disabled={isSubmitting} type="submit" className="me-2">
          Sign up
        </button>
      </form>
      <p className="text-center mt-4 text-secondary">
        <span>
          Already have an account? <Link to="/signin">Sign in</Link>
        </span>
      </p>
    </>
  )
}
