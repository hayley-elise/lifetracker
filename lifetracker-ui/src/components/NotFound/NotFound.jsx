import * as React from "react"
import {Link} from "react-router-dom"
import "./NotFound.css"

export default function NotFound() {
    
    return (
        <div className = "not-found">
          <p> Can't find what you were looking for? </p>

          <br/>

          <Link to = "/"> Return to Home Page: </Link>
        </div>
    )

}