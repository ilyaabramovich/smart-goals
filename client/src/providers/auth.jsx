import { useState } from 'react'
import { logOut, signIn, signUp } from '../api/auth'
import { AuthContext } from '../context/auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const isLoggedIn = !!user

  const signin = (userData) => {
    return signIn(userData).then((user) => {
      setUser(user)
    })
  }

  const signup = (userData) => {
    return signUp(userData).then((user) => {
      setUser(user)
    })
  }

  const logout = () => {
    return logOut().then(() => {
      setUser(null)
    })
  }

  const value = { user, signin, signup, logout, isLoggedIn }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
