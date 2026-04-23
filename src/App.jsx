import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './login.jsx'
import Register from './register.jsx'
import Dashboard from './Dashboard.jsx'
import Profile from './Profile.jsx'
import Accounts from './Accounts.jsx'
import ContactManager from './ContactManager.jsx'
import Header from './Header.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    // clear persisted current user
    try { localStorage.removeItem('currentUser'); } catch (e) {}
    setIsLoggedIn(false)
  }

  return (
    <Router>
      {!isLoggedIn ? (
        showRegister ? (
          <Register onRegistered={() => setShowRegister(false)} onCancel={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
        )
      ) : (
        <>
          {/* header lives outside of routes so it appears on every page */}
          <Header onLogout={handleLogout} />
          <div style={{ paddingTop: 100 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/contacts" element={<ContactManager />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  )
}

export default App
