import { SearchBox } from "../component/SearchBox/SearchBox"
import { Menu } from "../component/Siderbar/Mobile/Menu"
import { FloatingBall } from "../component/Siderbar/Mobile/FloatingBall"
import { WeatherDay } from "../component/WeatherDay/WeatherDay"
import { WeatherNow } from "../component/WeatherNow/WeatherNow"
import { WeatherFuture } from "../component/WeatherFuture/WeatherFuture"
import { Siderbar } from "../component/Siderbar/SiderBar"
import { useState } from "react"

export const Home = () => {
    const [isAdd, setIsAdd] = useState(false)
    const handleAdd = () => {
        setIsAdd((pre) => true)
    }
    const handleRemove = () => {
        setIsAdd((pre) => false)
    }
    return (
        // 页面盒子
        <div className='w-full min-h-screen flex'>
            {/* 登录与收藏 */}
            <div className='flex w-1/5 justify-end  max-md:hidden'>
                <Siderbar />
            </div>
            <FloatingBall handleAdd={handleAdd} />
            <Menu handleRemove={handleRemove} isAdd={isAdd} />

            {/* 具体天气 */}
            <div className='w-4/5 max-md:w-full z-10'>
                <div className='min-w-90 flex flex-col items-center justify-evenly gap-10 py-10  z-10'>
                    <div className='w-full z-10 flex justify-center'>
                        <SearchBox />
                    </div>
                    <div className='w-full z-10 flex justify-center'>
                        <WeatherNow />
                    </div>
                    <div className='w-full z-10 flex justify-center'>
                        <WeatherDay />
                    </div>
                    <div className='w-full z-10 flex justify-center'>
                        <WeatherFuture />
                    </div>
                </div>
            </div>
        </div>
    )
}
