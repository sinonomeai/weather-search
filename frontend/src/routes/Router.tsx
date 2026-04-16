import { createBrowserRouter } from "react-router-dom"
import { AdminPage } from "../pages/Admin"
import { NotFoundPage } from "../pages/NotFoundPage"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Home } from "../pages/Home"
import { UserHome } from "../pages/UserHome"
import { Dashboard } from "../component/admin/DashBoard"
import { Announcements } from "../component/admin/Announcements"
import { DataManagement } from "../component/admin/DataManagement"
import { UserManagement } from "../component/admin/UserManagement"
import { RequireAdmin } from "./RequireAdmin"
import { RequireLogin } from "./RequireLogin"

export const router = () => {
    const routers = [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/:id",
            element: (
                <RequireLogin>
                    <UserHome />
                </RequireLogin>
            ),
        },
        {
            path: "/Admin",
            element: (
                <RequireAdmin>
                    <AdminPage />
                </RequireAdmin>
            ),
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                },
                {
                    path: "dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "announcements",
                    element: <Announcements />,
                },
                {
                    path: "data",
                    element: <DataManagement />,
                },
                {
                    path: "users",
                    element: <UserManagement />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "*",
            element: <NotFoundPage />,
        }
    ]
    return createBrowserRouter(routers)
}
