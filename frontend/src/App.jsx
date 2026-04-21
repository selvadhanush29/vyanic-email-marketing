import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Subscribers from './pages/Subscribers'
import Campaigns from './pages/Campaigns'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', background: '#0b1e2d', color: '#e0f0ff', fontFamily: 'Segoe UI, sans-serif' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Navbar />
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subscribers" element={<Subscribers />} />
              <Route path="/campaigns" element={<Campaigns />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App