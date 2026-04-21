import { useState, useEffect } from 'react'
import axios from 'axios'

function Subscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/subscribers')
      setSubscribers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/subscribers', { name, email })
      setMessage('✅ Subscriber added successfully!')
      setName('')
      setEmail('')
      fetchSubscribers()
    } catch (err) {
      setMessage('❌ ' + err.response?.data?.error || 'Something went wrong')
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
    padding: '9px 12px', color: '#e0f0ff', fontSize: '13px',
    outline: 'none', boxSizing: 'border-box'
  }

  const cardStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px', padding: '18px'
  }

  return (
    <div>
      <h2 style={{ color: '#e0f0ff', marginBottom: '20px', fontSize: '20px' }}>Subscribers</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>

        {/* Subscribers List */}
        <div style={cardStyle}>
          <div style={{ color: '#a0bfcc', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '12px' }}>
            All Subscribers ({subscribers.length})
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Status', 'Joined'].map(h => (
                  <th key={h} style={{ color: '#6b8fa8', fontSize: '11px', textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id}>
                  <td style={{ color: '#c5dff0', fontSize: '12px', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{sub.name}</td>
                  <td style={{ color: '#c5dff0', fontSize: '12px', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{sub.email}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ background: 'rgba(0,229,192,0.12)', color: '#00e5c0', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>{sub.status}</span>
                  </td>
                  <td style={{ color: '#6b8fa8', fontSize: '11px', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr><td colSpan="4" style={{ color: '#6b8fa8', textAlign: 'center', padding: '20px', fontSize: '13px' }}>No subscribers yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Subscriber Form */}
        <div style={cardStyle}>
          <div style={{ color: '#a0bfcc', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '16px' }}>Add New Subscriber</div>
          {message && (
            <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '12px', fontSize: '12px', background: message.includes('✅') ? 'rgba(0,229,192,0.1)' : 'rgba(231,76,60,0.1)', color: message.includes('✅') ? '#00e5c0' : '#e74c3c' }}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ color: '#6b8fa8', fontSize: '11px', display: 'block', marginBottom: '5px' }}>Full Name</label>
              <input style={inputStyle} placeholder="e.g. Priya Sharma" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ color: '#6b8fa8', fontSize: '11px', display: 'block', marginBottom: '5px' }}>Email Address</label>
              <input style={inputStyle} type="email" placeholder="priya@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit" style={{
              width: '100%', padding: '10px',
              background: 'linear-gradient(90deg,#00c9a7,#0070c0)',
              border: 'none', borderRadius: '8px',
              color: '#fff', fontSize: '13px',
              fontWeight: '500', cursor: 'pointer'
            }}>
              Add Subscriber
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Subscribers