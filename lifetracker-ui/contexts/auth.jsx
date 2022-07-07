import {createContext, useState, useContext, useEffect} from "react"
import apiClient from "../services/apiClient"

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState()
    const [initialized, setInitialized] = useState()
    const [isProcessing, setIsProcessing] = useState()
    const [loggedIn, setLoggedIn] = useState()
    const setIsLoading = useState()
    const [error, setError] = useState()
    const form = useState({
        username: "",
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        confirmedPassword: "",
    })


    useEffect(() => {
        const token = localStorage.getItem("lifetracker_token")
        if (token) {
            apiClient.setToken(token)
            setIsProcessing(true)
            setError(null)
            fetchUserFromToken()
        }

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
    async function loginUser(e) {
        e.preventDefault()
        setIsLoading(true)
        setError((e) => ({...e, form: null}))

        const {data, error} = await apiClient.login({email: form.email, password: form.password})
        if (error) {
            setError((e) => ({...e, form: error}))
            const message = error?.response?.data?.error?.message
            setError((e) => ({...e, form: message ? String(message) : String(error)}))
            setIsLoading(false)
        }

        if (data?.user) {
            setUser(data.user)
            apiClient.setToken(data.token)
            setIsLoading(false)
            setLoggedIn(true)
        }
    }


    // signup user
    async function signupUser(e) {
        e.preventDefault()
        setIsLoading(true)
        setError((e) => ({...e, form: null}))

        if (form.confirmedPassword !== form.password) {
            setError((e) => ({...e, confirmedPassword: "Passwords do not match."}))
            setIsLoading(false)
            return
        } else {
            setError((e) => ({...e, confirmedPassword: null}))
        }

        const {data, error} = await apiClient.signup({username: form.username, firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password})
        if (error) {
            setError((e) => ({...e, form: error}))
            const message = error?.response?.data?.error?.message
            setError((e) => ({...e, form: message ? String(message) : String(error)}))
            setIsLoading(false)
        }

        if (data?.user) {
            setUser(data.user)
            apiClient.setToken(data.token)
            setIsLoading(false)
            setLoggedIn(true)
        }
    }


    // logout user
    async function logoutUser() {
        await apiClient.logout()
        setLoggedIn(false)
    }


    const authValue = {user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError, loggedIn, setLoggedIn}

    return (
        <AuthContext.Provider value = {authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
