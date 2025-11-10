import { useEffect, useState } from 'react'

const Profile = ({ onLogout }) => {
    const [user, setUser] = useState(null)

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
                    console.error('Error al obtener perfil')
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
        fetchProfile()
    }, [])

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include'
            })
            if (response.ok) {
                onLogout()
            } else {
                console.error('Error al cerrar sesión')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    if (!user) {
        return <div>Cargando...</div>
    }

    return (
        <div>
            <h1>Perfil</h1>
            <p>ID: {user.id}</p>
            <p>Nombre: {user.name}</p>
            <p>Apellido: {user.lastname}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Profile