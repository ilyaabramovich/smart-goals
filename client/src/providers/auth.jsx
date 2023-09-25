import { useState } from "react";
import { logOut, signIn, signUp } from "../api/auth";
import { AuthContext } from "../context/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isLoggedIn = !!user;

  const signin = async (userData) => {
    const user = await signIn(userData);
    setUser(user);
  };

  const signup = async (userData) => {
    const user = await signUp(userData);
    setUser(user);
  };

  const logout = async () => {
    await logOut();
    setUser(null);
  };

  const value = { user, signin, signup, logout, isLoggedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
