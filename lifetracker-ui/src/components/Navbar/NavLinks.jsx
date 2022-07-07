import "./Navbar.css"
import * as React from "react"
import {Link} from "react-router-dom"
import {useAuthContext} from "../../../contexts/auth"


export default function NavLinks() {
    const loggedIn = useAuthContext()

    async function logoutUser() {useAuthContext()}


    return (
        <div className = "nav-links">
            <Link to = "/activity"> Activity </Link>
            <Link to = "/exercise"> Exercise </Link>
            <Link to = "/nutrition"> Nutrition </Link>
            <Link to = "/sleep"> Sleep </Link>
            {loggedIn ? <button className = "logout-button" onClick = {logoutUser}> Logout </button> : 
                <> <Link to = "/login"> Login </Link> 
                <Link to="/register"> Register </Link> </>}
        </div>
      )
}