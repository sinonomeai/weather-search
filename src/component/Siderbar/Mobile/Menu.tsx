import { CityCollect } from "../CityCollect"
import { HomeLogin } from "../HomeLogin"
import { ThemeChange } from "../ThemeChange"
import { Translation } from "../Translation"
import { useUserData } from "../../../stores/userData"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { MobileContext } from "../../../hooks/useMobile"

export const Menu = () => {
     const { handleRemove, isAdd } = useContext(MobileContext)
    const { userData } = useUserData()
    const isAdmin = userData?.role === "admin"
    return (
        <div className={`${isAdd ? "menu-in" : "menu-out"}  pt-[30px] md:hidden`}>
            <HomeLogin />
            <ThemeChange />
            <Translation />
            <CityCollect />
            {isAdmin && (
                <div className='h-[60px] w-4/5 mx-auto mt-[50px] mb-[10px]'>
                    <NavLink to='/admin' className='admin-nav-back'>
                        返回后台
                    </NavLink>
                </div>
            )}
            <div className='remove'>
                <button onClick={handleRemove} className='pointer'>
                    X
                </button>
            </div>
        </div>
    )
}
