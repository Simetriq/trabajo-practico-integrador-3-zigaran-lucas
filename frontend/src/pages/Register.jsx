import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useForm } from "../hooks/useForm"
import Loading from '../components/Loading'

const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const validations = {
        name: { required: true },
        lastname: { required: true },
        username: { required: true },
        email: { required: true, email: true },
        password: { required: true, minLength: 6 }
    }

    const onSubmit = async (formData) => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/register', {
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
                alert(data.message || 'Error en registro')
            }
        } catch (error) {
            alert('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    const { form, errors, handleFormChange, handleSubmit } = useForm({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    }, onSubmit, validations)

    if (loading) return <Loading />

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Register</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-sm font-medium">Lastname</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                </div>
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
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700" disabled={loading}>
                    Register
                </button>
                <p className="mt-4 text-center">
                    Ya tienes cuenta? <Link to="/login" className="text-blue-500">Inicia sesión</Link>
                </p>
            </form>
        </div>
    )
}

export default Register