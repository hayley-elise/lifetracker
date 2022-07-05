import * as React from "react"
import "./LoginForm.css"
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

export default function LoginForm() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        username: "",
        password: "",
    })


    // error handling
    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }


    // submit login
    const loginUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors((e) => ({...e, form: null}))

        try {
            const res = await axios.post(`http://localhost:3001/auth/login`, form)

            if (res?.data) {
                setAppState(res.data)
                setIsLoading(false)
                navigate("/activity")
            } else {
                setErrors((e) => ({...e, form: "Invalid username/password."}))
                setIsLoading(false)
            }
        } catch (err) {
            const message = err?.response?.data?.error?.message
            setErrors((e) => ({...e, form: message ? String(message) : String(err)}))
            setIsLoading(false)
        }

    }
  

    return (
        <div className = "login-form">

            {/* Email */}
            <label htmlFor = "email"> Email </label>
            <input 
                className = "form-input" 
                name = "email" 
                type = "email" 
                value = {form.email} 
                onChange = {handleOnInputChange}
                placeholder = "MJ@hehe.com"
            /> 
            {errors.email && <span className = "error"> {errors.email} </span>}

            <br/>

            {/* Password */}
            <label htmlFor = "password"> Password </label>
            <input 
                className = "form-input" 
                name = "password" 
                type = "password" 
                value = {form.password} 
                onChange = {handleOnInputChange}
            />
            {errors.password && <span className = "error"> {errors.password} </span>}

            <br/>

            {/* Sign-up Button */}
            <button className = "submit-login" onClick = {loginUser}> Log In! </button>

            <br/>

            {/* Link to Registration page */}
            <div className = "footer">
                <p>  Don't have an account? Sign up <Link to = "/register"> here! </Link>  </p>
            </div>

        </div>
    )
    
}