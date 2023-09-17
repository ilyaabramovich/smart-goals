import { useState } from 'react'
import { logOut, signIn, signUp } from '../api/auth'
import { AuthContext } from '../context/auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const isLoggedIn = !!user

  const signin = (newUser) => {
    return signIn(newUser).then((user) => {
      setUser(user)
    })
  }

  const signup = (newUser) => {
    return signUp(newUser).then((user) => {
      setUser(user)
    })
  }

  const signout = () => {
    return logOut().then(() => {
      setUser(null)
    })
  }

  const value = { user, signin, signup, signout, isLoggedIn }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
