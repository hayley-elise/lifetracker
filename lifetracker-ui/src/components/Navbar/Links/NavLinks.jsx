import "./NavLinks.css"
import {Link} from "react-router-dom"
import {useAuthContext} from "../../../../contexts/auth"


export default function NavLinks() {
    // checks if user is logged in using auth context
    const {loggedIn} = useAuthContext()
    // logout user with auth context
    const {logoutUser} = useAuthContext()

    return (
        <div className = "nav-links">
            <Link to = "/activity"> Activity </Link>
            <Link to = "/exercise"> Exercise </Link>
            <Link to = "/nutrition"> Nutrition </Link>
            <Link to = "/sleep"> Sleep </Link>
            {loggedIn ? <button  className = "logout-button"  onClick = {logoutUser}>  Logout  </button> : 
                <> <Link to = "/login"> Login </Link>   <Link to = "/register"> Register </Link> </>}
        </div>
      )
}