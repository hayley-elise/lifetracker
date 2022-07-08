import "./App.css"
import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "../Navbar/Bar/Navbar"
import LandingPage from "../Landing/LandingPage"
import LoginPage from "../Login/Page/LoginPage"
import RegistrationPage from "../Registration/Page/RegistrationPage"
import ActivityPage from "../Activity/ActivityPage"
import Exercise from "../Activity/Exercise/Exercise"
import Sleep from "../Activity/Sleep/Sleep"
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
              <Route path = "/register" element = {<RegistrationPage/>}/>
              <Route path = "/login" element = {<LoginPage/>}/>
              {/* check if user is logged in */}
              <Route path = "/activity" element = {!loggedIn ? <AccessForbidden/> : <ActivityPage/>}/>
              <Route path = "/exercise" element = {!loggedIn ? <AccessForbidden/> : <Exercise/>}/>
              <Route path = "/sleep" element = {!loggedIn ? <AccessForbidden/> : <Sleep/>}/>
              <Route path = "/nutrition/*" element = {!loggedIn ? <AccessForbidden/> : <NutritionPage/>}/>
              <Route path = "*" element = {<NotFound/>}/>
            </Routes>

        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}