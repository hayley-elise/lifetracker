import * as React from "react"
import {Link} from "react-router-dom"
import "./Navbar.css"
import {useAuthContext} from "../../../contexts/auth"

export default function NavLinks() {
    const {loggedIn, logoutUser} = useAuthContext()

    return (
        <div className = "nav-links">
            <Link to = {loggedIn ? "/activity" : "/login"}> Activity </Link>
            <Link to = {loggedIn ? "/exercise" : "/login"}> Exercise </Link>
            <Link to = {loggedIn ? "/nutrition" : "/login"}> Nutrition </Link>
            <Link to = {loggedIn ? "/sleep" : "/login"}> Sleep </Link>
            {loggedIn ? <button className = "logout-button" onClick = {logoutUser}> Logout </button> : <Link to = "/login"> <button className = "login-button"> Login </button> </Link>}
            {loggedIn ? <button className = "logout-button" onClick = {logoutUser}> Logout </button> : <Link to = "/register"> <button className = "register-button"> Register </button> </Link>}
        </div>
      )

}