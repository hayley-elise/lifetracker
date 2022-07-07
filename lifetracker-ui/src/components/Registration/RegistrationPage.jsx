import * as React from "react"
import {Navigate} from "react-router-dom"
import RegistrationForm from "../Registration/RegistrationForm"
import {useAuthContext} from "../../../contexts/auth"


export default function RegistrationPage() {
  const loggedIn = useAuthContext()


  return (
    <div className = "registration-page">
      {loggedIn ? <Navigate to = "/activity"/> : <RegistrationForm/>}
    </div>
  )

}