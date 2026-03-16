import { SearchBox } from "../component/SearchBox/SearchBox"
import { WeatherDay } from "../component/WeatherDay/WeatherDay"
import { WeatherNow } from "../component/WeatherNow/WeatherNow"
import { WeatherFuture } from "../component/WeatherFuture/WeatherFuture"
import { CityCollect } from "../component/Siderbar/CityCollect"
import { HomeLogin } from "../component/Siderbar/HomeLogin"
import { ThemeChange } from "../component/Siderbar/ThemeChange"
import { Translation } from "../component/Siderbar/Translation"
import { useEffect } from "react"
import { useUserData } from "../stores/userData"

export const Home = () => {
    const { setUserData } = useUserData()
    useEffect(() => {
        const storeUserInfo = localStorage.getItem("userInfo")
        if (storeUserInfo) {
            setUserData(JSON.parse(storeUserInfo))
        }
    }, [])
    return (
        // 页面盒子
        <div className='w-full min-h-screen flex'>
            {/* 登录与收藏 */}
            <div className='flex w-1/5 justify-end py-10 max-md:hidden'>
                <div className='backgroundStyle flex flex-col w-9/50 min-w-35  h-9/10 p-8 fixed top-10 '>
                    <HomeLogin />
                    <ThemeChange />
                    <Translation />
                    <CityCollect />
                </div>
            </div>
            {/* 具体天气 */}
            <div className='w-4/5 max-md:w-full'>
                <div className='min-w-130 flex flex-col items-center justify-evenly gap-10 p-10'>
                    <div className='w-full z-20 flex justify-center'>
                        <SearchBox />
                    </div>
                    <div className='w-full z-10 flex justify-center'>
                        <WeatherNow />
                    </div>
                    <WeatherDay />
                    <WeatherFuture />
                </div>
            </div>
        </div>
    )
}
