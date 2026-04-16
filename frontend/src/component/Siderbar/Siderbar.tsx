import { CityCollect } from "./CityCollect"
import { HomeLogin } from "./HomeLogin"
import { ThemeChange } from "./ThemeChange"
import { Translation } from "./Translation"
import { useUserData } from "../../stores/userData"
import { NavLink } from "react-router-dom"
    import { useTranslation } from "react-i18next"
export const Siderbar = ()=>{
    const {userData} = useUserData()
    const isAdmin = userData?.role === "admin"
    const { t } = useTranslation(); 
    return (
        <div className='backgroundStyle flex flex-col w-9/50 min-w-38  h-9/10 p-[30px] max-lg:p-[20px] fixed top-10 overflow-y-auto overflow-x-hidden'>
            <HomeLogin />
            <ThemeChange />
            <Translation />
            <CityCollect />
            {isAdmin && (
                <div className='h-[60px] w-4/5 mx-auto mt-[50px] mb-[10px]'>
                    <NavLink to='/admin' className='admin-nav-back'>
                        {t("backReturn")}
                    </NavLink>
                </div>
            )}
        </div>
    )
}