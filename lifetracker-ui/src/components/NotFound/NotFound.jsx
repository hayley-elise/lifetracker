import * as React from "react"
import {Link} from "react-router-dom"
import "./NotFound.css"


export default function NotFound() {
    
    return (
        <div className = "not-found">
          <h1> So sorry :( </h1>
          <h2> Couldn't find the page you were looking for. </h2>
          <br/><br/><br/>
          <p> <Link to = "/"> Return to Home Page </Link> </p>
        </div>
    )
}