// import {createContext, useState, useContext, useEffect} from "react"

// const AuthContext = createContext(null)

// export const AuthContextProvider = ({children}) => {
//     const [user, setUser] = useState()
//     const [initialized, setInitialized] = useState()
//     const [isProcessing, setIsProcessing] = useState()
//     const [error, setError] = useState()
//     const authValue = {user, setUser, initialized, setInitialized, isProcessing, setIsProcessing, error, setError}

//     return (
//         <AuthContext.Provider value = {authValue}>
//             <>{children}</>
//         </AuthContext.Provider>
//     )
// }

// export const useAuthContext = () => useContext(AuthContext)
