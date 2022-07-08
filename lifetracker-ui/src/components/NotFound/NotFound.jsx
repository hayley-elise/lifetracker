import * as React from "react"
import {Link} from "react-router-dom"
import "./NotFound.css"


export default function NotFound() {
    
    return (
        <div className = "not-found">
          <h1> Oh no. Couldn't find what you were looking for? </h1>
          <br/><br/><br/>
          <p> <Link to = "/"> Return to Home Page </Link> </p>
        </div>
    )
}