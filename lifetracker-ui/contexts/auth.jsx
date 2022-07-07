import * as React from "react"
import {createContext, useState, useContext, useEffect} from "react"
import apiClient from "../services/apiClient"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [form, setForm] = useState({
        username: "",
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        confirmedPassword: "",
    })

    const authValue = {user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError}

    useEffect(() => {
        const token = localStorage.getItem("lifetracker_token")
        if (token) {
            apiClient.setToken(token)
            isProcessing(true)
            error(null)
            fetchUserFromToken()
        }

        isProcessing(false)
        initialized(true)
    }, [])

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
            navigate("/activity")
        }

        setLoggedIn(true)
    }
    
    async function signupUser(e) {
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
            navigate("/activity")
        }

        setIsLoading(false)
        setLoggedIn(true)
    }

    async function fetchUserFromToken() {
        const {data, error} = await apiClient.fetchUserFromToken()
        if (error) {
            setError((e) => ({...e, form: error}))
            const message = error?.response?.data?.error?.message
            setError((e) => ({...e, form: message ? String(message) : String(error)}))
        }

        if (data?.user) {
            user(data.user)
            error(null)
        }

        return user
    }

    async function logoutUser() {
        await apiClient.logout()
        setLoggedIn(false)
    }

    return (
        <AuthContextProvider value = {authValue}> {children} </AuthContextProvider>
    )
}

export const useAuthContext = () => useContext(AuthContext)