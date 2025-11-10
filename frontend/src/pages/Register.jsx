import { useForm } from "../hooks/useForm"


const Register = () => {
    const onSubmit = async (formData) => {
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
                console.log('Registro exitoso', data)
                // Aquí puedes redirigir o manejar el éxito
            } else {
                console.error('Error en registro', data)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const { form, handleFormChange, handleSubmit } = useForm({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    }, onSubmit)

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label htmlFor="name">name</label>
                <br></br>
                <input type="text" id="name" name="name" onChange={handleFormChange} value={form.name} />
                <br></br>
                <label htmlFor="lastname">lastname</label>
                <br></br>
                <input type="text" id="lastname" name="lastname" onChange={handleFormChange} value={form.lastname} />
                <br></br>
                <label htmlFor="username">username</label>
                <br></br>
                <input type="text" id="username" name="username" onChange={handleFormChange} value={form.username} />
                <br></br>
                <label htmlFor="email">email</label>
                <br></br>
                <input type="text" id="email" name="email" onChange={handleFormChange} value={form.email} />
                <br></br>
                <label htmlFor="password">password</label>
                <br></br>
                <input type="password" id="password" name="password" onChange={handleFormChange} value={form.password} />
                <br></br>
                <button type="submit">Register</button>
                <br></br>
            </form >
        </>
    )
}


export default Register