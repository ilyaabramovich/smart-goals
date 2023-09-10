import { createContext, useContext, useState } from 'react'
import { logOut, signIn, signUp } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

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

  const value = { user, signin, signup, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
