import * as React from "react"
import "./AccessForbidden.css"
import {Link} from "react-router-dom"

export default function AccessForbidden() {
    
    return (
        <div className = "access-forbidden">
          <p> Access forbidden. </p>

          <br/>

          <Link to = "/"> Return to Home Page: </Link>
        </div>
    )

}