import * as React from "react"
import "./LandingPage.css"
import smartwatch from "../../assets/smartwatch.svg"

export default function LandingPage() {
    
    return (
        <div className = "landing-page">
            <div className = "hero">
                <p className = "cta"> Lifetracker </p> 
                <img className = "hero-img" src = {smartwatch}/>
            </div>
        </div>
      )

}