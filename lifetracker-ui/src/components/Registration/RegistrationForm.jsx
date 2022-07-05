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
        username: "",
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        confirmedPassword: "",
    })
    

    // error handling
    const handleOnInputChange = (event) => {
        if (event.target.name === "password") {
            if (form.confirmedPassword && form.confirmedPassword !== event.target.value) {
                setErrors((e) => ({...e, confirmedPassword: "Passwords don't match."}))
            } else {
                setErrors((e) => ({...e, confirmedPassword: null}))
            }
        }

        if (event.target.name === "confirmedPassword") {
            if (form.password && form.password !== event.target.value) {
                setErrors((e) => ({...e, confirmedPassword: "Passwords don't match."}))
            } else {
                setErrors((e) => ({...e, confirmedPassword: null}))
            }
        }

        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
                setErrors((e) => ({...e, email: "Please enter a valid email."}))
            } else {
                setErrors((e) => ({...e, email: null}))
            }
        }

        setForm((f) => ({...f, [event.target.name]: event.target.value}))

    }


    // sign-up user
    const signupUser = async () => {
        setIsLoading(true)
        setErrors((e) => ({...e, form: null}))

        if (form.confirmedPassword !== form.password) {
            setErrors((e) => ({...e, confirmedPassword: "Passwords don't match..."}))
            setIsLoading(false)
            return
            } else {
                setErrors((e) => ({...e, confirmedPassword: null}))
            }   

        try {
            const res = await axios.post(`http://localhost:3001/auth/register`, {
                username: form.username,
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
            })

            if (res?.data?.user) {
                setAppState(res.data)
                setIsLoading(false)
                navigate("/activity")
            } else {
                setErrors((e) => ({...e, form: "Something went wrong with the registration; please try again."}))
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err)
            const message = err?.response?.data?.error?.message
            setErrors((e) => ({...e, form: message ? String(message) : String(err)}))
            setIsLoading(false)
        }

    }
    

    return (
        <div className = "registration-form">

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

            <br/>

            {/* First Name */}
            <label htmlFor = "name"> First Name </label>
            <input 
                className = "form-input" 
                name = "firstName" 
                type = "text" 
                value = {form.firstName} 
                onChange = {handleOnInputChange}
                placeholder = "Michael"
            /> 

            <br/>

            {/* Last Name */}
            <label htmlFor = "name"> Last Name </label>
            <input 
                className = "form-input" 
                name = "lastName" 
                type = "text" 
                value = {form.lastName} 
                onChange = {handleOnInputChange}
                placeholder = "Jackson"
            />

            <br/>

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

            {/* Password Confirmation */}
            <label htmlFor = "confirmedPassword"> Confirm Password </label>
            <input 
                className = "form-input" 
                name = "confirmedPassword" 
                type = "password" 
                value = {form.confirmedPassword} 
                onChange = {handleOnInputChange}
            />
            {errors.confirmedPassword && <span className = "error"> {errors.confirmedPassword} </span>}

            <br/>

            {/* Sign-up Button */}
            <button className = "submit-registration" onClick = {signupUser}> Create Account! </button>

            <br/>

            {/* Link to Login page */}
            <div className = "footer">
                <p>  Already have an account? Login <Link to = "/login"> here! </Link>  </p>
            </div>

        </div>
  )

}