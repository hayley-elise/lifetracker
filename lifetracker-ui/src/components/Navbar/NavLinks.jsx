import * as React from "react"
import {Link} from "react-router-dom"

export default function NavLinks() {

    return (
        <div className = "nav-links">
            <Link to = "/activity"> Activity </Link>
            <Link to = "/nutrition"> Nutrition </Link>

            {/* if logged in, call logoutUser function */}
            {/* logoutUser ~ remove "lifetracker_token" from local storage & refresh page */}
            {/* ~~~ */}
            {/* if logged out, render "/login" & "/register" routes */}
            
            <Link to = "/login"> Login </Link>
            <Link to="/register"> Register </Link>
        </div>
      )

}