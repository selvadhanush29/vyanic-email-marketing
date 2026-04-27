import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('vyanic_token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.get('http://localhost:8000/api/auth/me')
        .then(res => {
          setIsLoggedIn(true)
          setUsername(res.data.username)
        })
        .catch(() => {
          localStorage.removeItem('vyanic_token')
          delete axios.defaults.headers.common['Authorization']
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token, user) => {
    localStorage.setItem('vyanic_token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setIsLoggedIn(true)
    setUsername(user)
  }

  const logout = () => {
    localStorage.removeItem('vyanic_token')
    delete axios.defaults.headers.common['Authorization']
    setIsLoggedIn(false)
    setUsername('')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}