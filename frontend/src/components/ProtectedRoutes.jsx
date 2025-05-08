import { Navigate } from "react-router-dom"
import { useAuthorizedStatus } from "../hooks/useAuthorizedStatus"

function ProtectedRoute({children}) {
    const isAuthorized = useAuthorizedStatus();

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute