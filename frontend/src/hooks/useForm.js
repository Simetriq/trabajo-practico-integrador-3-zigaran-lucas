import { useState } from "react"


export const useForm = (initialForm, onSubmit) => {

    const [form, setForm] = useState(initialForm)

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleResetForm = () => {
        return setForm(initialForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await onSubmit(form)
    }

    return {
        form,
        handleFormChange,
        handleResetForm,
        handleSubmit
    }
}
