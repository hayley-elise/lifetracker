import * as React from "react"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import NotFound from "../NotFound/NotFound"

export default function App() {

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar/>

          <Routes>
            <Route path = "/" element = {<LandingPage/>} />

            <Route path = "/register" element = {<RegistrationPage/>} />
            <Route path = "/login" element = {<LoginPage/>} />
            
            {/* access granted only if user is logged in, otherwise render AccessForbidden */}
            <Route path = "/activity" element = {<ActivityPage/>}/>
            <Route path = "/nutrition/*" element = {<NutritionPage/>}/>
            {/* ~~~~~~ */}

            <Route path = "*" element = {<NotFound/>}/>
          </Routes>

        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

export default function AppContainer(App) {
  // for later

  return (
    App
  )

}