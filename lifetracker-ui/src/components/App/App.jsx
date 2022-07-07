import "./App.css"
import * as React from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import LandingPage from "../Landing/LandingPage"
import LoginPage from "../Login/LoginPage"
import RegistrationPage from "../Registration/RegistrationPage"
import ActivityPage from "../Activity/ActivityPage"
import NutritionPage from "../Nutrition/NutritionPage"
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import NotFound from "../NotFound/NotFound"
import {AuthContextProvider, useAuthContext} from "../../../contexts/auth"


export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  )
}


function App() {
  const {loggedIn} = useAuthContext()

  
  return (
    <div className = "app">
      <React.Fragment>
        <BrowserRouter>

            <Navbar/>
            <Routes>
              <Route path = "/" element = {<LandingPage/>}/>
              <Route path = "/register" element = {loggedIn ? <Navigate to = "/activity"/> : <RegistrationPage/>}/>
              <Route path = "/login" element = {loggedIn ? <Navigate to = "/activity"/> : <LoginPage/>}/>
              <Route path = "/activity" element = {!loggedIn ? <AccessForbidden/> : <ActivityPage/>}/>
              <Route path = "/nutrition/*" element = {!loggedIn ? <AccessForbidden/> : <NutritionPage/>}/>
              <Route path = "*" element = {<NotFound/>}/>
            </Routes>

        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}