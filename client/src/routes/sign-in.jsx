import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useEffect, useRef, useState } from 'react'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef()
  const { signin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
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
      await signin(userData)
      navigate(from, { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto md:w-1/2">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <section className="mb-3" id="username">
          <label>Username</label>
          <input ref={ref} name="username" autoComplete="username" />
        </section>
        <section className="mb-3 position-relative" id="current-password">
          <label>Password</label>
          <button
            className="position-absolute top-0 end-0 p-0 border-0 bg-transparent text-secondary"
            onClick={() => {
              setShowPassword(!showPassword)
            }}
            id="toggle-password"
            type="button"
            aria-label={
              showPassword
                ? 'Hide password.'
                : 'Show password as plain text. Warning: this will display your password on the screen.'
            }
          >{`${showPassword ? 'Hide' : 'Show'} password`}</button>
          <input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" />
        </section>
        <button disabled={isSubmitting} type="submit" className="me-2">
          Sign in
        </button>
      </form>
      <p className="text-center mt-4 text-secondary">
        <span>
          Do not have an account yet? <Link to="/signup">Sign up</Link>
        </span>
      </p>
    </>
  )
}
