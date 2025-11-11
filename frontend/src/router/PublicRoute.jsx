import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

const PublicRoute = ({ children }) => {
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

    if (isAuthenticated === null) {
        return <Loading />
    }

    return isAuthenticated ? <Navigate to="/home" /> : children
}

export default PublicRoute