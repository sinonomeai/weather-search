import { SearchBox } from "../component/SearchBox/SearchBox"
import { WeatherDay } from "../component/WeatherDay/WeatherDay"
import { WeatherNow } from "../component/WeatherNow/WeatherNow"
import { WeatherFuture } from "../component/WeatherFuture/WeatherFuture"
import { Siderbar } from "../component/Siderbar/SiderBar"

export const UserHome = () => {
    return (
        // 页面盒子
        <div className='w-full min-h-screen flex'>
            {/* 登录与收藏 */}
            <div className='flex w-1/5 justify-end  max-md:hidden'>
                <Siderbar />
            </div>
            {/* 具体天气 */}
            <div className='w-4/5 max-md:w-full'>
                <div className='min-w-130 flex flex-col items-center justify-evenly gap-10 py-10'>
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
