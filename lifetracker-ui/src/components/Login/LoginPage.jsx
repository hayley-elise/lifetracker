import * as React from "react"
import LoginForm from "./Login/LoginForm"

export default function LoginPage() {

  return (
    <div className = "login-page">
        {/* if logged in, redirect them to /activity */}
        {/* ~~~ */}
        {/* if not logged in, render LoginForm */}
        <LoginForm/>
    </div>
  )

}