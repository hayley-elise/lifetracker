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

// export default function AppContainer() {
//   return (
//     <AuthContext.Provider>
//       <App/>
//     </AuthContext.Provider>
//   )
// }

export default function App() {
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