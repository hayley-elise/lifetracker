import * as React from "react"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../Landing/LandingPage"
import LoginPage from "../Login/LoginPage"
import RegistrationPage from "../Registration/RegistrationPage"
import ActivityPage from "../Activity/ActivityPage"
import NutritionPage from "../Nutrition/NutritionPage"
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import NotFound from "../NotFound/NotFound"
import {AuthContextProvider} from "../../../contexts/auth"

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  )
}

function App() {
  return (
    <div className = "app">
      <React.Fragment>
        <BrowserRouter>

            <Navbar/>
            <Routes>
              <Route path = "/" element = {<LandingPage/>}/>
              <Route path = "/register" element = {<RegistrationPage/>}/>
              <Route path = "/login" element = {<LoginPage/>}/>
              <Route path = "/activity" element = {<ActivityPage/>}/>
              <Route path = "/nutrition/*" element = {<NutritionPage/>}/>
              <Route path = "*" element = {<NotFound/>}/>
            </Routes>

        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}