import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Subscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const fileRef = useRef()

  useEffect(() => { fetchSubscribers() }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/subscribers')
      setSubscribers(res.data)
    } catch (err) { console.error(err) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/subscribers', { name, email })
      setMessage('✅ Subscriber added!')
      setName(''); setEmail('')
      fetchSubscribers()
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || 'Something went wrong'))
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setUploadMessage('')
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setUploadMessage('✅ ' + res.data.message)
      fetchSubscribers()
    } catch (err) {
      setUploadMessage('❌ ' + (err.response?.data?.error || 'Upload failed'))
    }
    setUploading(false)
    fileRef.current.value = ''
  }

  const filtered = subscribers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

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

  const msgStyle = (msg) => ({
    padding: '10px', borderRadius: '8px', marginBottom: '12px',
    fontSize: '12px',
    background: msg.includes('✅') ? 'rgba(0,229,192,0.1)' : 'rgba(231,76,60,0.1)',
    color: msg.includes('✅') ? '#00e5c0' : '#e74c3c'
  })

  return (
    <div>
      <h2 style={{ color: '#e0f0ff', marginBottom: '20px', fontSize: '20px' }}>Subscribers</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>

        {/* Left — List */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ color: '#a0bfcc', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.6px' }}>
              All Subscribers ({subscribers.length})
            </div>
          </div>

          {/* Search */}
          <input
            style={{ ...inputStyle, marginBottom: '12px' }}
            placeholder="🔍  Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {/* Upload Banner */}
          <div style={{
            background: 'rgba(0,229,192,0.06)', border: '1px dashed rgba(0,229,192,0.3)',
            borderRadius: '8px', padding: '12px 16px', marginBottom: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px'
          }}>
            <div>
              <div style={{ color: '#00e5c0', fontSize: '12px', fontWeight: '500' }}>📊 Bulk Upload via Excel / CSV</div>
              <div style={{ color: '#6b8fa8', fontSize: '11px', marginTop: '3px' }}>
                Columns needed: <span style={{ color: '#00e5c0' }}>name</span> and <span style={{ color: '#00e5c0' }}>email</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
              <button
                onClick={() => fileRef.current.click()}
                disabled={uploading}
                style={{
                  background: 'linear-gradient(90deg,#00c9a7,#0070c0)',
                  border: 'none', borderRadius: '6px', color: '#fff',
                  fontSize: '11px', padding: '6px 14px', cursor: 'pointer',
                  opacity: uploading ? 0.6 : 1
                }}>
                {uploading ? '⏳ Uploading...' : '📁 Upload File'}
              </button>
              <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload} style={{ display: 'none' }} />
            </div>
          </div>

          {uploadMessage && <div style={msgStyle(uploadMessage)}>{uploadMessage}</div>}

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Status', 'Joined'].map(h => (
                  <th key={h} style={{ color: '#6b8fa8', fontSize: '11px', textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
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
              {filtered.length === 0 && (
                <tr><td colSpan="4" style={{ color: '#6b8fa8', textAlign: 'center', padding: '20px', fontSize: '13px' }}>
                  {search ? 'No matches found' : 'No subscribers yet'}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right — Add Form */}
        <div style={cardStyle}>
          <div style={{ color: '#a0bfcc', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '16px' }}>
            Add New Subscriber
          </div>
          {message && <div style={msgStyle(message)}>{message}</div>}
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
              color: '#fff', fontSize: '13px', fontWeight: '500', cursor: 'pointer'
            }}>
              Add Subscriber
            </button>
          </form>

          {/* Excel Format Guide */}
          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
            <div style={{ color: '#a0bfcc', fontSize: '11px', marginBottom: '8px', fontWeight: '500' }}>📋 Excel Format Guide</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr>
                  <th style={{ color: '#00e5c0', padding: '4px 8px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>name</th>
                  <th style={{ color: '#00e5c0', padding: '4px 8px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: '#6b8fa8', padding: '4px 8px' }}>Priya Sharma</td>
                  <td style={{ color: '#6b8fa8', padding: '4px 8px' }}>priya@gmail.com</td>
                </tr>
                <tr>
                  <td style={{ color: '#6b8fa8', padding: '4px 8px' }}>Rajan Mehta</td>
                  <td style={{ color: '#6b8fa8', padding: '4px 8px' }}>rajan@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribers