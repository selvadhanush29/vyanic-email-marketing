import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        username, password
      })
      login(res.data.token, res.data.username)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#e0f0ff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border .2s'
  }

  return (
    <div style={{
      height: '100vh',
      background: '#0b1e2d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#0e2436',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '40px 32px',
        boxSizing: 'border-box'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg,#00c9a7,#0070c0)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '24px', fontWeight: '700', color: '#fff'
          }}>V</div>
          <h1 style={{ color: '#e0f0ff', fontSize: '22px', fontWeight: '600', margin: '0 0 6px' }}>
            Vyanic
          </h1>
          <p style={{ color: '#6b8fa8', fontSize: '13px', margin: 0 }}>
            Email Marketing Dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(231,76,60,0.1)',
            border: '1px solid rgba(231,76,60,0.2)',
            borderRadius: '8px', padding: '10px 14px',
            color: '#e74c3c', fontSize: '13px', marginBottom: '16px'
          }}>
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              color: '#6b8fa8', fontSize: '12px',
              display: 'block', marginBottom: '6px'
            }}>Username</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              color: '#6b8fa8', fontSize: '12px',
              display: 'block', marginBottom: '6px'
            }}>Password</label>
            <input
              style={inputStyle}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: loading
                ? 'rgba(0,229,192,0.3)'
                : 'linear-gradient(90deg,#00c9a7,#0070c0)',
              border: 'none', borderRadius: '10px',
              color: '#fff', fontSize: '14px',
              fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity .2s'
            }}>
            {loading ? '⏳ Logging in...' : '🔐 Login'}
          </button>
        </form>

        {/* Hint */}
        <div style={{
          marginTop: '24px', padding: '12px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '8px', textAlign: 'center'
        }}>
          <p style={{ color: '#6b8fa8', fontSize: '11px', margin: 0 }}>
            Default: <span style={{ color: '#00e5c0' }}>admin</span> / <span style={{ color: '#00e5c0' }}>vyanic123</span>
          </p>
        </div>

        {/* Footer */}
        <p style={{
          color: '#3a5a70', fontSize: '11px',
          textAlign: 'center', marginTop: '20px', marginBottom: 0
        }}>
          © 2026 Vyanic. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login