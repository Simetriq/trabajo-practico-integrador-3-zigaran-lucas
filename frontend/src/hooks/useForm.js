import { useState } from "react"


export const useForm = (initialForm, onSubmit, validations = {}) => {

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            })
        }
    }

    const handleResetForm = () => {
        setForm(initialForm)
        setErrors({})
    }
//! Por si queres hacer una validacion
    const validate = () => {
        const newErrors = {}
        for (const field in validations) {
            if (validations[field].required && !form[field]?.trim()) {
                newErrors[field] = 'Este campo es obligatorio'
            }
            if (validations[field].minLength && form[field]?.length < validations[field].minLength) {
                newErrors[field] = `Debe tener al menos ${validations[field].minLength} caracteres`
            }
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            await onSubmit(form)
        }
    }

    return {
        form,
        errors,
        setForm,
        handleFormChange,
        handleResetForm,
        handleSubmit
    }
}
