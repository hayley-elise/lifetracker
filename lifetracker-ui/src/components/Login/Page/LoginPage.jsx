import "./LoginPage.css"
import {Navigate} from "react-router-dom"
import LoginForm from "../Form/LoginForm"
import {useAuthContext} from "../../../../contexts/auth"


export default function LoginPage() {
  const {loggedIn} = useAuthContext()

  return (
    <div className = "login-page">
      {loggedIn ? Navigate("/activity") : <LoginForm/>}
    </div>
  )
}