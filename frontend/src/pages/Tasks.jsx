import { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import Loading from '../components/Loading'

const Tasks = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingTask, setEditingTask] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const validations = {
        title: { required: true },
        description: { required: true }
    }

    const onSubmit = async (formData) => {
        try {
            const url = editingTask ? `http://localhost:3000/api/tasks/${editingTask.id}` : 'http://localhost:3000/api/tasks'
            const method = editingTask ? 'PUT' : 'POST'
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                fetchTasks()
                setShowForm(false)
                setEditingTask(null)
                handleResetForm()
            } else {
                alert('Error al guardar tarea')
            }
        } catch (error) {
            alert('Error de conexión')
        }
    }

    const { form, setForm, handleFormChange, handleSubmit, handleResetForm } = useForm(
        { title: '', description: '', is_completed: false },
        onSubmit,
        validations
    )

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tasks-by-user', { credentials: 'include' })
            if (response.ok) {
                const data = await response.json()
                setTasks(data)
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleEdit = (task) => {
        setEditingTask(task)
        setForm({ title: task.title, description: task.description, is_completed: task.is_completed })
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar tarea?')) return
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (response.ok) {
                fetchTasks()
            } else {
                alert('Error al eliminar')
            }
        } catch (error) {
            alert('Error de conexión')
        }
    }

    const handleToggleComplete = async (task) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...task, is_completed: !task.is_completed })
            })
            if (response.ok) {
                fetchTasks()
            }
        } catch (error) {
            alert('Error de conexión')
        }
    }

    if (loading) return <Loading />

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-3xl mb-4">Tareas</h1>
                <button
                    onClick={() => { setShowForm(!showForm); setEditingTask(null); handleResetForm() }}
                    className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {showForm ? 'Cancelar' : 'Nueva Tarea'}
                </button>

                {showForm && (
                    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
                        <h2 className="text-xl mb-2">{editingTask ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
                        <div className="mb-2">
                            <label className="block">Título</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleFormChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block">Descripción</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleFormChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="is_completed"
                                    checked={form.is_completed}
                                    onChange={(e) => handleFormChange({ target: { name: 'is_completed', value: e.target.checked } })}
                                />
                                Completada
                            </label>
                        </div>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                            Guardar
                        </button>
                    </form>
                )}

                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <p>No hay tareas</p>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id} className={`p-4 border rounded ${task.is_completed ? 'bg-green-50 line-through' : 'bg-white'}`}>
                                <h3 className="text-lg font-bold">{task.title}</h3>
                                <p>{task.description}</p>
                                <div className="mt-2 space-x-2">
                                    <button
                                        onClick={() => handleToggleComplete(task)}
                                        className={`px-3 py-1 rounded ${task.is_completed ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                                    >
                                        {task.is_completed ? 'Marcar Pendiente' : 'Marcar Completada'}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Tasks