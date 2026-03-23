import { useUserData } from "../stores/userData"
import { Navigate } from "react-router-dom"
interface RequireAdminProps {
    children: React.ReactNode
}

export const RequireAdmin = ({ children }: RequireAdminProps) => {
    const { userData } = useUserData()
    if (!userData) {
        return <Navigate to='/login' replace />
    }

    if (userData.role !== "admin") {
        console.log("不是管理员，role =", userData.role)
        return <Navigate to='/' replace />
    }

    return <>{children}</>
}
