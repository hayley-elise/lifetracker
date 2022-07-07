import * as React from "react"
import {Navigate} from "react-router-dom"
import LoginForm from "../Login/LoginForm"
import {useAuthContext} from "../../../contexts/auth"


export default function LoginPage() {
  const {loggedIn} = useAuthContext()

  return (
    <div className = "login-page">
      {loggedIn ? <Navigate to = "/activity"/> : <LoginForm/>}
    </div>
  )

}