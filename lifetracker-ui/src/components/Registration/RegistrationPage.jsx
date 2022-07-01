import * as React from "react"
import RegistrationForm from "../Registration/RegistrationForm"

export default function RegistrationPage() {

  return (
    <div className = "registration-page">
        {/* if logged in, redirect them to /activity */}
        {/* ~~~ */}
        {/* if not logged in, render RegistrationForm */}
        <RegistrationForm/>
    </div>
  )

}