import "./RegisterPage.css"
import {Navigate} from "react-router-dom"
import RegistrationForm from "../Form/RegistrationForm"
import {useAuthContext} from "../../../../contexts/auth"


export default function RegistrationPage() {
  const {loggedIn} = useAuthContext()

  return (
    <div className = "registration-page">
      {loggedIn ? Navigate("/activity") : <RegistrationForm/>}
    </div>
  )
}