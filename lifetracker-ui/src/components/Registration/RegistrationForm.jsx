import * as React from "react"
import "./RegForm.css"
import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import axios from "axios"

export default function RegistrationForm({setAppState}) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        firstName: "", 
        lastName: "", 
        email: "", 
        username: "", 
        password: "", 
        passwordConfirm: "",
    })
    
    // error handling
    const handleOnInputChange = (event) => {
        if (event.target.name === "password") {
            if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
                setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
            } else {
                setErrors((e) => ({ ...e, passwordConfirm: null }))
            }
        }

        if (event.target.name === "passwordConfirm") {
            if (form.password && form.password !== event.target.value) {
                setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }))
            } else {
                setErrors((e) => ({ ...e, passwordConfirm: null }))
            }
        }

        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
                setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
            } else {
                setErrors((e) => ({ ...e, email: null }))
            }
        }

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))

    }

    // sign-up user
    const signupUser = async () => {
        setIsLoading(true)
        setErrors((e) => ({ ...e, form: null }))

        if (form.passwordConfirm !== form.password) {
            setErrors((e) => ({ ...e, passwordConfirm: "Passwords don't match..." }))
            setIsLoading(false)
            return
            } else {
                setErrors((e) => ({ ...e, passwordConfirm: "Passwords match!" }))
            }   

        try {
            const res = await axios.post("http://localhost:3001/auth/register", {
                firstName: form.firstName,
                lastName: form.lastName,
                username: form.username,
                email: form.email,
                password: form.password,
            })

            if (res?.data?.user) {
                setAppState(res.data)
                setIsLoading(false)
                navigate("/activity")
            } else {
                setErrors((e) => ({ ...e, form: "Something went wrong with the registration, please try again." }))
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err)
            const message = err?.response?.data?.error?.message
            setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
            setIsLoading(false)
        }

    }
    

    return (
        <div className = "registration-form">

            {/* First Name */}
            <label htmlFor = "name"> First Name </label>
            <input 
                className = "form-input" 
                name = "firstName" 
                type = "text" 
                value = {form.first_name} 
                onChange = {handleOnInputChange}
                placeholder = "Michael"
            /> 
            {errors.first_name && <span className = "error"> {errors.first_name} </span>}

            <br/>

            {/* Last Name */}
            <label htmlFor = "name"> Last Name </label>
            <input 
                className = "form-input" 
                name = "lastName" 
                type = "text" 
                value = {form.last_name} 
                onChange = {handleOnInputChange}
                placeholder = "Jackson"
            /> 
            {errors.last_name && <span className = "error"> {errors.last_name} </span>}

            <br/>

            {/* Email */}
            <label htmlFor = "email"> Email </label>
            <input 
                className = "form-input" 
                name = "email" 
                type = "email" 
                value = {form.email} 
                onChange = {handleOnInputChange}
                placeholder = "michaelJackson@hehe.com"
            /> 
            {errors.email && <span className = "error"> {errors.email} </span>}

            <br/>

            {/* Username */}
            <label htmlFor = "name"> Username </label>
            <input 
                className = "form-input" 
                name = "username" 
                type = "text" 
                value = {form.username} 
                onChange = {handleOnInputChange}
                placeholder = "KingOfPop69"
            />
            {errors.username && <span className = "error"> {errors.username} </span>}

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

            {/* Password Confirmation */}
            <label htmlFor = "passwordConfirm"> Confirm Password </label>
            <input 
                className = "form-input" 
                name = "passwordConfirm" 
                type = "passowrd" 
                value = {form.passwordConfirm} 
                onChange = {handleOnInputChange}
            />
            {errors.passwordConfirm && <span className = "error"> {errors.passwordConfirm} </span>}

            <br/>

            {/* Sign-up Button */}
            <Link to = "/activity"> <button className = "submit-registration" onClick = {signupUser}> Create Account! </button> </Link>

            <br/>

            {/* Link to Login page */}
            <div className = "footer">
                <p>  Already have an account? Login <Link to = "/login"> here! </Link>  </p>
            </div>

        </div>
  )

}