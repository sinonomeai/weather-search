import { Outlet } from "react-router-dom"
import { SiderBar } from "../component/admin/SiderBar"
export const AdminPage = () => {
    return (
        <div className='admin-page w-screen h-screen p-[20px] flex gap-[25px] '>
            <SiderBar />
            <div className='backgroundStyle flex-5 min-w-[400px] p-[40px] overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    )
}
