import * as React from "react"
import "./LandingPage.css"
import smartwatch from "../../assets/smartwatch.svg"

export default function LandingPage() {
    
    return (
        <div className = "landing-page">
            <div className = "hero"> 
                <img className = "hero-img" src = {smartwatch}/>
                <p className = "cta"> Helping you take back control of your life </p>
            </div>
        </div>
      )

}