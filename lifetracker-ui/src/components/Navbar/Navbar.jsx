import * as React from "react"
import "./Navbar.css"
import {Link} from "react-router-dom"
import NavLinks from "../Navbar/NavLinks.jsx"
import Codepath_logo from "../../assets/Codepath.svg"

export default function Navbar() {
    
    return (
        <nav className = "Navbar">
            <div className = "content">

                <div className = "logo">
                    <Link to = "/">
                        <img className = "logo" src = {Codepath_logo}/>
                    </Link>
                </div>

                <NavLinks/>

            </div>
        </nav>
    )

}