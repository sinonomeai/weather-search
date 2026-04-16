import { useUserData } from "../stores/userData"
import { Navigate, useParams } from "react-router-dom"
interface RequireLoginProps {
    children: React.ReactNode
}

export const RequireLogin = ({ children }: RequireLoginProps) => {
    const { userData } = useUserData()
    const { id } = useParams<{ id: string }>()

    if (!userData) {
        return <Navigate to='/' replace />
    }
    if (userData.id !== id) {
        return <Navigate to={`/${userData.id}`} replace />
    }

    return <>{children}</>
}