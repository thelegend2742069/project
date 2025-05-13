import { createContext, useEffect, useState } from "react"
import { useAuthorizedStatus } from "./useAuthorizedStatus"


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const initialStatus = useAuthorizedStatus()
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        setIsAuthorized(initialStatus)
    }, [initialStatus]);

    return (
        <AuthContext.Provider value = {{isAuthorized, setIsAuthorized}}>
            {children}
        </AuthContext.Provider>
    )
}