import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Tasks from '../pages/Tasks'
import Profile from '../pages/Profile'

const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/profile', {
                    credentials: 'include'
                })
                setIsAuthenticated(response.ok)
            } catch (error) {
                setIsAuthenticated(false)
            }
        }
        checkAuth()
    }, [])

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include'
            })
            setIsAuthenticated(false)
        } catch (error) {
            console.error('Error al logout')
        }
    }

    if (isAuthenticated === null) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <main className="flex-grow">
                    <Routes>
                        {isAuthenticated ? (
                            <>
                                <Route path="/home" element={<Home />} />
                                <Route path="/tasks" element={<Tasks />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/" element={<Navigate to="/home" />} />
                                <Route path="*" element={<Navigate to="/home" />} />
                            </>
                        ) : (
                            <>
                                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                                <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
                                <Route path="/" element={<Navigate to="/login" />} />
                                <Route path="*" element={<Navigate to="/login" />} />
                            </>
                        )}
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRouter