"use client";
// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // On page load, check localStorage for JWT or user info
  useEffect(() => {
    const savedUser = localStorage.getItem("userId");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (userData, jwt_token) => {
    setUser(userData._id);
    setToken(jwt_token);
    localStorage.setItem("userId", userData._id);
    localStorage.setItem("auth_token", jwt_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("auth_token");
  };

  const isLogin = () => {
    return !!user; // true if user exists
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
