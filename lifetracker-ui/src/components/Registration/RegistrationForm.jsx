import "./RegForm.css"
import React, {useState} from "react"
import {Link} from "react-router-dom"
import {useAuthContext} from "../../../contexts/auth"


export default function RegistrationForm() {
    const [errors, setErrors] = useState()
    const [form, setForm] = useState({
        username: "",
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        confirmedPassword: "",
    })
    const isLoading = useState()
    

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


    // signup user
    async function signupUser() {useAuthContext()}
    

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
            {errors.email && <span className = "error"> {errors.email} </span>}
            <label htmlFor = "email"> Email </label>
            <input 
                className = "form-input" 
                name = "email" 
                type = "email" 
                value = {form.email} 
                onChange = {handleOnInputChange}
                placeholder = "MJ@hehe.com"
            /> 

            <br/>

            {/* Password */}
            {errors.password && <span className = "error"> {errors.password} </span>}
            <label htmlFor = "password"> Password </label>
            <input 
                className = "form-input" 
                name = "password" 
                type = "password" 
                value = {form.password} 
                onChange = {handleOnInputChange}
            />

            <br/>

            {/* Password Confirmation */}
            {errors.confirmedPassword && <span className = "error"> {errors.confirmedPassword} </span>}
            <label htmlFor = "confirmedPassword"> Confirm Password </label>
            <input 
                className = "form-input" 
                name = "confirmedPassword" 
                type = "password" 
                value = {form.confirmedPassword} 
                onChange = {handleOnInputChange}
            />

            <br/>

            {/* Sign-up Button */}
            <button className = "submit-registration" disabled = {isLoading} onClick = {signupUser}> {isLoading ? "Loading..." : "Create Account!"} </button>

            <br/>

            {/* Link to Login page */}
            <div className = "footer">
                <p>  Already have an account? Login <Link to = "/login"> here! </Link>  </p>
            </div>

        </div>
  )

}