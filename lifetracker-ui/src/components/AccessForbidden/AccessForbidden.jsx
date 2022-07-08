import "./AccessForbidden.css"
import {Link} from "react-router-dom"


export default function AccessForbidden() {
    
    return (
        <div className = "access-forbidden">
          <h1> Access forbidden. </h1>
          <h2> You must <Link to = "/register"> register </Link> or <Link to = "/login"> log in </Link> to access this page. </h2>
          <br/><br/><br/>
          <p> <Link to = "/"> Return to Home Page </Link> </p>
        </div>
    )
}