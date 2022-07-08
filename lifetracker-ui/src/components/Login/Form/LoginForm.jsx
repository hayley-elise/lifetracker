import "./LoginForm.css"
import {useState} from "react"
import {Link} from "react-router-dom"
import {useAuthContext} from "../../../../contexts/auth"


export default function LoginForm() {
    const [errors, setErrors] = useState()
    const [form, setForm] = useState({
        email: "",  password: ""
    })
    const isLoading = useState()


    // login user with auth context
    async function loginUser() {useAuthContext()}

    // error checking
    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
          if (event.target.value.indexOf("@") === -1) {
            setErrors((e) => ({...e, email: "Please enter a valid email."}))
          } else {
            setErrors((e) => ({...e, email: null}))
          }
        }
    
        setForm((f) => ({...f, [event.target.name]: event.target.value}))
    }
  

    return (
        <div className = "login-form">

            {/* Email */}
            {errors.email && <span className = "error"> {errors.email} </span>}
            <label htmlFor = "email"> Email </label>
            <input 
                className = "form-input"   name = "email"   type = "email" 
                value = {form.email}   onChange = {handleOnInputChange}   placeholder = "MJ@hehe.com"
            />

            <br/>

            {/* Password */}
            {errors.password && <span className = "error"> {errors.password} </span>}
            <label htmlFor = "password"> Password </label>
            <input 
                className = "form-input"   name = "password"   type = "password" 
                value = {form.password}   onChange = {handleOnInputChange}   placeholder = "shhhhh... it's a secret..."
            />

            <br/>

            {/* Login Button */}
            <button   className = "submit-login"   disabled = {isLoading}   onClick = {loginUser}>  
                {isLoading ? "Loading..." : "Log In"}  
            </button>

            <br/>

            {/* Link to Registration page */}
            <div className = "footer">
                <p>  Don't have an account? Sign up  <Link to = "/register"> here! </Link>  </p>
            </div>

        </div>
    )
}