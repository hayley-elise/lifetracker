import {createContext, useState, useContext, useEffect} from "react"

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState()
    const [initialized, setInitialized] = useState()
    const [isProcessing, setIsProcessing] = useState()
    const [error, setError] = useState()
    // const [form, setForm] = useState({
    //     username: "",
    //     firstName: "", 
    //     lastName: "", 
    //     email: "", 
    //     password: "", 
    //     confirmedPassword: "",
    // })

    useEffect(() => {
        const token = localStorage.getItem("lifetracker_token")
        if (token) {
            apiClient.setToken(token)
            isProcessing = setIsProcessing(true)
            error = setError(null)
            fetchUserFromToken()
        }

        setIsProcessing(false)
        setInitialized(true)
    }, [])

    async function fetchUserFromToken() {
        const {data, error} = await apiClient.fetchUserFromToken()
        if (error) {
            setError((e) => ({...e, form: error}))
            const message = error?.response?.data?.error?.message
            setError((e) => ({...e, form: message ? String(message) : String(error)}))
        }

        if (data?.user) {
            user = setUser(user)
            error = setError(null)
        }

        return user
    }

    const authValue = {user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError}

    return (
        <AuthContext.Provider value = {authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
