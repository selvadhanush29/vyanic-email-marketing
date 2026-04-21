import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '⊞' },
  { path: '/subscribers', label: 'Subscribers', icon: '👥' },
  { path: '/campaigns', label: 'Campaigns', icon: '📧' },
]

function Sidebar() {
  return (
    <div style={{
      width: '200px',
      background: '#0e2436',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      flexShrink: 0
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 18px 24px' }}>
        <div style={{
          width: '28px', height: '28px',
          background: 'linear-gradient(135deg,#00c9a7,#0070c0)',
          borderRadius: '8px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: '700', fontSize: '13px'
        }}>V</div>
        <span style={{ color: '#e0f0ff', fontSize: '14px', fontWeight: '600' }}>Vyanic</span>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              color: isActive ? '#00e5c0' : '#6b8fa8',
              borderLeft: isActive ? '3px solid #00e5c0' : '3px solid transparent',
              background: isActive ? 'rgba(0,229,192,0.07)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13px',
              transition: 'all .15s'
            })}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: '#6b8fa8', fontSize: '13px', cursor: 'pointer' }}>
          <span>⚙️</span> Settings
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: '#6b8fa8', fontSize: '13px', cursor: 'pointer' }}>
          <span>↪</span> Logout
        </div>
      </div>
    </div>
  )
}

export default Sidebar