import { createBrowserRouter } from "react-router-dom"
import { AdminPage } from "../pages/Admin"
import { NotFoundPage } from "../pages/NotFoundPage"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Home } from "../pages/Home"
import { Dashboard } from "../component/admin/dashBoard"
import { Announcements } from "../component/admin/Announcements"
import { DataManagement } from "../component/admin/DataManagement"
import { UserManagement } from "../component/admin/UserManagement"
const routers = [
    {
        path: "/:id?",
        element: <Home />,
    },
    {
        path: "/Admin",
        element: <AdminPage />,
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
    },
]
export const router = createBrowserRouter(routers)
