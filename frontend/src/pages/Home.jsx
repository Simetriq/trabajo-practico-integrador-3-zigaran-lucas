import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

const Home = () => {
    const [user, setUser] = useState(null)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, tasksRes] = await Promise.all([
                    fetch('http://localhost:3000/api/profile', { credentials: 'include' }),
                    fetch('http://localhost:3000/api/tasks-by-user', { credentials: 'include' })
                ])

                if (profileRes.ok) {
                    const profileData = await profileRes.json()
                    setUser(profileData.user)
                }

                if (tasksRes.ok) {
                    const tasksData = await tasksRes.json()
                    setTasks(tasksData)
                }
            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <Loading />

    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.is_completed).length
    const pendingTasks = totalTasks - completedTasks

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-3xl mb-4">Bienvenido, {user?.name}!</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded">
                        <h2 className="text-xl font-bold">Total de Tareas</h2>
                        <p className="text-2xl">{totalTasks}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded">
                        <h2 className="text-xl font-bold">Tareas Completadas</h2>
                        <p className="text-2xl">{completedTasks}</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded">
                        <h2 className="text-xl font-bold">Tareas Pendientes</h2>
                        <p className="text-2xl">{pendingTasks}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home