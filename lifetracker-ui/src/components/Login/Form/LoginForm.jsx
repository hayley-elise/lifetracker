import "./LoginForm.css"
import {useState} from "react"
import {Link} from "react-router-dom"
import {useAuthContext} from "../../../../contexts/auth"


export default function LoginForm() {
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",  password: ""
    })


    // login user with auth context
    const {loginUser} = useAuthContext()


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
            <label htmlFor = "email"> Email </label>
            <br/>
            <input 
                className = "form-input"   name = "email"   type = "email" 
                value = {form.email}   onChange = {handleOnInputChange}   placeholder = "MJ@hehe.com"
            /> {errors.email && <span className = "error"> {errors.email} </span>}

            <br/>

            {/* Password */}
            <label htmlFor = "password"> Password </label>
            <br/>
            <input 
                className = "form-input"   name = "password"   type = "password" 
                value = {form.password}   onChange = {handleOnInputChange}   placeholder = "shhhhh... it's a secret..."
            /> {errors.password && <span className = "error"> {errors.password} </span>}

            <br/><br/>

            {/* Login Button */}
            <button   className = "submit-login"  onClick = {loginUser}>  Log In  </button>

            <br/><br/>

            {/* Link to Registration page */}
            <div className = "footer">
                <p>  Don't have an account yet? Sign up  <Link to = "/register"> here! </Link>  </p>
            </div>

        </div>
    )
}