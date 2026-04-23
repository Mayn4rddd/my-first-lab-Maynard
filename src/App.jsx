import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './login.jsx'
import Register from './register.jsx'
import Dashboard from './Dashboard.jsx'
import Profile from './Profile.jsx'
import Accounts from './Accounts.jsx'
import ContactManager from './ContactManager.jsx'
import Header from './Header.jsx'

function PrivateRoute({ currentUser, children }) {
  return currentUser ? children : <Navigate to="/login" replace />
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      return JSON.parse(localStorage.getItem('currentUser'))
    } catch (e) {
      return null
    }
  })
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    setAuthChecked(true)
  }, [])

  const handleLogin = (user) => {
    setCurrentUser(user)
    try {
      localStorage.setItem('currentUser', JSON.stringify(user))
    } catch (e) {
      // ignore localStorage failures
    }
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser')
    } catch (e) {
      // ignore localStorage failures
    }
    setCurrentUser(null)
  }

  if (!authChecked) {
    return <div className="loading-screen">Checking login status...</div>
  }

  const LoginWrapper = () => {
    const navigate = useNavigate()
    return (
      <Login
        onLogin={(user) => {
          handleLogin(user)
          navigate('/dashboard')
        }}
        onShowRegister={() => navigate('/register')}
      />
    )
  }

  const RegisterWrapper = () => {
    const navigate = useNavigate()
    return (
      <Register
        onRegistered={() => navigate('/login')}
        onCancel={() => navigate('/login')}
      />
    )
  }

  return (
    <Router>
      {currentUser && <Header onLogout={handleLogout} />}
      <div style={{ paddingTop: currentUser ? 100 : 0 }}>
        <Routes>
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <LoginWrapper />
            }
          />
          <Route
            path="/register"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <RegisterWrapper />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Accounts />
              </PrivateRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute currentUser={currentUser}>
                <ContactManager />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate
                to={currentUser ? '/dashboard' : '/login'}
                replace
              />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
