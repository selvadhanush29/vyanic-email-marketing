function Navbar({ title }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: '#0b1e2d'
    }}>
      <div style={{ color: '#e0f0ff', fontSize: '18px', fontWeight: '600' }}>
        Vyanic Email Marketing
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ color: '#6b8fa8', fontSize: '18px', cursor: 'pointer' }}>🔔</span>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'linear-gradient(135deg,#c0392b,#8e44ad)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff',
          fontSize: '11px', fontWeight: '600'
        }}>SD</div>
        <span style={{ color: '#a0bfcc', fontSize: '13px' }}>Selvadhanush</span>
      </div>
    </div>
  )
}

export default Navbar