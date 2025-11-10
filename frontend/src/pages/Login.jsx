import { useForm } from "../hooks/useForm"



const Login = ({ onLoginSuccess, onGoToRegister }) => {
    const onSubmit = async (formData) => {
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
                console.log('Login exitoso', data)
                onLoginSuccess()
            } else {
                console.error('Error en login', data)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const { form, handleFormChange, handleSubmit } = useForm({
        username: '',
        password: ''
    }, onSubmit)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="username">username</label>
                <br></br>
                <input type="text" id="username" name="username" onChange={handleFormChange} value={form.username} />
                <br></br>
                <label htmlFor="password">password</label>
                <br></br>
                <input type="password" id="password" name="password" onChange={handleFormChange} value={form.password} />
                <br></br>
                <button type="submit">Login</button>
                <br></br>
                <button type="button" onClick={onGoToRegister}>Ir a Registro</button>
            </form >

        </>
    )
}

export default Login
