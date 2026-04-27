import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '⊞' },
  { path: '/subscribers', label: 'Subscribers', icon: '👥' },
  { path: '/campaigns', label: 'Campaigns', icon: '📧' },
]

function Sidebar() {
  const { logout, username } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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

      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 18px',
              color: isActive ? '#00e5c0' : '#6b8fa8',
              borderLeft: isActive ? '3px solid #00e5c0' : '3px solid transparent',
              background: isActive ? 'rgba(0,229,192,0.07)' : 'transparent',
              textDecoration: 'none', fontSize: '13px', transition: 'all .15s'
            })}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
        <div style={{ padding: '8px 18px', color: '#3a5a70', fontSize: '11px' }}>
          Logged in as <span style={{ color: '#00e5c0' }}>{username}</span>
        </div>
        <div
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 18px', color: '#e74c3c',
            fontSize: '13px', cursor: 'pointer',
            transition: 'background .15s'
          }}>
          <span>↪</span> Logout
        </div>
      </div>
    </div>
  )
}

export default Sidebar