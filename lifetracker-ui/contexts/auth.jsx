import {createContext, useState, useContext, useEffect} from "react"
import apiClient from "../services/apiClient"
// import {Navigate} from "react-router-dom"


const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [error, setError] = useState({})
    const form = useState({
        username: "",
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        confirmedPassword: "",
    })
    const [initialized, setInitialized] = useState({})
    const [isProcessing, setIsProcessing] = useState({})
    const [loggedIn, setLoggedIn] = useState({})
    const [user, setUser] = useState({})


    useEffect(() => {
        const token = localStorage.getItem("lifetracker_token")

        if (token) {
            apiClient.setToken(token)
            setIsProcessing(true)
            setError(null)
            fetchUserFromToken()
        }
        setLoggedIn(false)
        setIsProcessing(false)
        setInitialized(true)
    }, [])

    // fetch user data from token
    async function fetchUserFromToken() {
        const {data, error} = await apiClient.fetchUserFromToken()

        if (error) {
            setError((e) => ({...e, form: error}))
            const message = error?.response?.data?.error?.message
            setError((e) => ({...e, form: message ? String(message) : String(error)}))
        }

        if (data?.user) {
            setUser(data.user)
            setError(null)
        }
    }

    // login user
    // current issues:
    // doesn't navigate to activity page
    const loginUser = async () => {
        setError((e) => ({...e, form: null}))
        const {data, error} = await apiClient.login({email: form.email, password: form.password})
        
        if (error) {
            setError((e) => ({...e, form: error}))
            const message = error?.response?.data?.error?.message
            setError((e) => ({...e, form: message ? String(message) : String(error)}))
        }

        if (data?.user) {
            setUser(data.user)
            apiClient.setToken(data.token)
        }
        setLoggedIn(true)
        // Navigate("/activity")
        console.log("login successful")
    }

    // signup user
    // current issues:
    // doesn't navigate to activity page
    // user able to sign up with the same username/email (functional in the backend)
    const signupUser = async () => {
        setError((e) => ({...e, form: null}))

        if (form.confirmedPassword !== form.password) {
            setError((e) => ({...e, confirmedPassword: "Passwords do not match."}))
            return
        } else {
            setError((e) => ({...e, confirmedPassword: null}))
        }

        const {data, error} = await apiClient.signup({username: form.username, firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password})
        
        if (error) {
            setError((e) => ({...e, form: error}))
            const message = error?.response?.data?.error?.message
            setError((e) => ({...e, form: message ? String(message) : String(error)}))
        }

        if (data?.user) {
            setUser(data.user)
            apiClient.setToken(data.token)
        }
        // Navigate("/activity")
        setLoggedIn(true)
        console.log("sign-up successful")
    }

    // logout user
    // current issues:
    // if I log out while not on the landing page, "Access Forbidden" renders instead of navigating back to landing 
    const logoutUser = async () => {
        await apiClient.logout()
        setLoggedIn(false)
        setUser({})
        // Navigate("/")
        console.log("logout successful")
    }

    const authValue = {
        user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError, loggedIn, setLoggedIn, loginUser, logoutUser, signupUser}


    return (
        <AuthContext.Provider value = {authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext)