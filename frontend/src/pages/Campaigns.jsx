import { useState, useEffect } from 'react'
import axios from 'axios'

function Campaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/campaigns')
      setCampaigns(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/campaigns', { title, subject, body })
      setMessage('✅ Campaign created successfully!')
      setTitle('')
      setSubject('')
      setBody('')
      fetchCampaigns()
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || 'Something went wrong'))
    }
  }

  const sendCampaign = async (campaignId) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/email/send/${campaignId}`)
      setMessage('✅ ' + res.data.message)
      fetchCampaigns()
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || 'Failed to send'))
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
    padding: '9px 12px', color: '#e0f0ff', fontSize: '13px',
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit'
  }

  const cardStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px', padding: '18px',
    marginBottom: '16px'
  }

  return (
    <div>
      <h2 style={{ color: '#e0f0ff', marginBottom: '20px', fontSize: '20px' }}>Campaigns</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px' }}>

        {/* Campaigns List */}
        <div style={cardStyle}>
          <div style={{ color: '#a0bfcc', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '12px' }}>
            All Campaigns ({campaigns.length})
          </div>
          {message && (
            <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '12px', fontSize: '12px', background: message.includes('✅') ? 'rgba(0,229,192,0.1)' : 'rgba(231,76,60,0.1)', color: message.includes('✅') ? '#00e5c0' : '#e74c3c' }}>
              {message}
            </div>
          )}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Title', 'Subject', 'Status', 'Created', 'Action'].map(h => (
                  <th key={h} style={{ color: '#6b8fa8', fontSize: '11px', textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td style={{ color: '#c5dff0', fontSize: '12px', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{c.title}</td>
                  <td style={{ color: '#c5dff0', fontSize: '12px', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{c.subject}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ background: c.status === 'sent' ? 'rgba(52,152,219,0.15)' : 'rgba(107,143,168,0.15)', color: c.status === 'sent' ? '#5dade2' : '#6b8fa8', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>{c.status}</span>
                  </td>
                  <td style={{ color: '#6b8fa8', fontSize: '11px', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {c.status === 'draft' && (
                      <button
                        onClick={() => sendCampaign(c.id)}
                        style={{
                          background: 'linear-gradient(90deg,#00c9a7,#0070c0)',
                          border: 'none', borderRadius: '6px',
                          color: '#fff', fontSize: '11px',
                          padding: '4px 12px', cursor: 'pointer'
                        }}>
                        Send
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr><td colSpan="5" style={{ color: '#6b8fa8', textAlign: 'center', padding: '20px', fontSize: '13px' }}>No campaigns yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Create Campaign Form */}
        <div style={cardStyle}>
          <div style={{ color: '#a0bfcc', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '16px' }}>Create New Campaign</div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ color: '#6b8fa8', fontSize: '11px', display: 'block', marginBottom: '5px' }}>Campaign Title</label>
              <input style={inputStyle} placeholder="e.g. June Newsletter" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ color: '#6b8fa8', fontSize: '11px', display: 'block', marginBottom: '5px' }}>Email Subject</label>
              <input style={inputStyle} placeholder="e.g. Big news from Vyanic!" value={subject} onChange={e => setSubject(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ color: '#6b8fa8', fontSize: '11px', display: 'block', marginBottom: '5px' }}>Email Body</label>
              <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="Write your email content here..." value={body} onChange={e => setBody(e.target.value)} required />
            </div>
            <button type="submit" style={{
              width: '100%', padding: '10px',
              background: 'linear-gradient(90deg,#00c9a7,#0070c0)',
              border: 'none', borderRadius: '8px',
              color: '#fff', fontSize: '13px',
              fontWeight: '500', cursor: 'pointer'
            }}>
              Create Campaign
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Campaigns