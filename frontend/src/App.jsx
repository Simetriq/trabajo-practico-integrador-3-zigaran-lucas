import './App.css'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

function App() {
  const [page, setPage] = useState('login')

  const handleLoginSuccess = () => {
    setPage('profile')
  }

  const handleRegisterSuccess = () => {
    setPage('login')
  }

  const handleLogout = () => {
    setPage('login')
  }

  const goToRegister = () => {
    setPage('register')
  }

  const goToLogin = () => {
    setPage('login')
  }

  if (page === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} onGoToRegister={goToRegister} />
  } else if (page === 'register') {
    return <Register onRegisterSuccess={handleRegisterSuccess} onGoToLogin={goToLogin} />
  } else if (page === 'profile') {
    return <Profile onLogout={handleLogout} />
  }

  return null
}

export default App
