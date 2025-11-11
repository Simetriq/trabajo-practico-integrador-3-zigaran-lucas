import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Loading from '../components/Loading'

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/profile', {
                    credentials: 'include'
                })
                if (response.ok) {
                    const data = await response.json()
                    setUser(data.user)
                } else {
                    navigate('/login')
                }
            } catch (error) {
                navigate('/login')
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [navigate])

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include'
            })
            navigate('/login')
        } catch (error) {
            console.error('Error al cerrar sesión')
        }
    }

    if (loading) return <Loading />

    if (!user) return <div>Error al cargar perfil</div>

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Perfil</h1>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Apellido:</strong> {user.lastname}</p>
                <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Profile