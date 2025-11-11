import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useForm } from "../hooks/useForm"
import Loading from '../components/Loading'

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const validations = {
        username: { required: true },
        password: { required: true, minLength: 6 }
    }

    const onSubmit = async (formData) => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (response.ok) {
                navigate('/home')
            } else {
                alert(data.message || 'Error en login')
            }
        } catch (error) {
            alert('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    const { form, errors, handleFormChange, handleSubmit } = useForm({
        username: '',
        password: ''
    }, onSubmit, validations)

    if (loading) return <Loading />

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Login</h1>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700" disabled={loading}>
                    Login
                </button>
                <p className="mt-4 text-center">
                    No tienes cuenta? <Link to="/register" className="text-blue-500">Regístrate</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
