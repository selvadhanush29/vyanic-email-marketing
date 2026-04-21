function Dashboard() {
  const stats = [
    { label: 'Total Subscribers', value: '0', sub: 'All time' },
    { label: 'Campaigns Sent', value: '0', sub: 'All time' },
    { label: 'Avg Open Rate', value: '0%', sub: 'All campaigns' },
    { label: 'Emails Sent', value: '0', sub: 'This month' },
  ]

  return (
    <div>
      <h2 style={{ color: '#e0f0ff', marginBottom: '20px', fontSize: '20px' }}>Dashboard</h2>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px', padding: '16px'
          }}>
            <div style={{ color: '#6b8fa8', fontSize: '11px', marginBottom: '6px' }}>{stat.label}</div>
            <div style={{ color: '#e0f0ff', fontSize: '22px', fontWeight: '600' }}>{stat.value}</div>
            <div style={{ color: '#00e5c0', fontSize: '11px', marginTop: '4px' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Welcome Card */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px', padding: '24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚀</div>
        <h3 style={{ color: '#e0f0ff', marginBottom: '8px' }}>Welcome to Vyanic Email Marketing!</h3>
        <p style={{ color: '#6b8fa8', fontSize: '13px' }}>
          Start by adding subscribers and creating your first campaign.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
