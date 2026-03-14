import { useWeatherData } from "../store/weatherData"
import { ConfigProvider, Tooltip } from "antd"
export const WeatherCard = () => {
    const { weatherData,pendingData } = useWeatherData()
    
    if (!weatherData) {
        return (
            <div className='w-full h-full text-center flex items-center justify-center'>
                <p className='text-gray-400 text-[30px]'>请先搜索城市</p>
            </div>
        )
    }
    
    const cardInfo = weatherData.realtime
    const suggestions = weatherData.lifeIndices

    return (
        <div className='w-full h-full flex flex-wrap justify-between items-center gap-5'>
            {/* 具体状况卡片 */}
            <div className='w-[205px] h-[205px] grid grid-cols-2 grid-rows-2 gap-1'>
                <div className='circleBox'>
                    <div className='outer-circle humidity-circle'></div>
                    <p className='text-gray-400 text-xs mt-1'>湿度</p>
                    <p className='text-white text-sm'>{cardInfo.humidity}%</p>
                </div>
                <div className='circleBox '>
                    <div className='outer-circle feelslike-circle'></div>
                    <p className='text-gray-400 text-xs mt-1'>体感</p>
                    <p className='text-white text-sm'>{cardInfo.feelsLike}°C</p>
                </div>
                <div className='circleBox'>
                    <div className='outer-circle visibility-circle'></div>
                    <p className='text-gray-400 text-xs mt-1'>能见度</p>
                    <p className='text-white text-sm'>{cardInfo.vis}km</p>
                </div>
                <div className='circleBox '>
                    <div className='outer-circle pressure-circle'></div>
                    <p className='text-gray-400 text-xs mt-1'>气压</p>
                    <p className='text-white text-sm'>{cardInfo.pressure}hPa</p>
                </div>
            </div>
            {/* 风状况卡片 */}
            <div className='w-[205px] h-[205px] bg-white/5 backdrop-blur-sm rounded-2xl p-4 flex flex-col'>
                <div className='flex-1 flex flex-col items-center justify-center border-b border-white/10'>
                    <p className='text-gray-400 text-xs mb-1'>风向</p>
                    <p className='text-white text-xl font-semibold'>{cardInfo.windDir}</p>
                </div>
                <div className='flex-1 flex items-center justify-around'>
                    <div className='text-center'>
                        <p className='text-gray-400 text-xs mb-1'>风力</p>
                        <p className='text-white text-lg font-semibold'>{cardInfo.windScale}级</p>
                    </div>
                    <div className='w-px h-8 bg-white/10'></div>
                    <div className='text-center'>
                        <p className='text-gray-400 text-xs mb-1'>风速</p>
                        <p className='text-white text-lg font-semibold'>{cardInfo.windSpeed}m/s</p>
                    </div>
                </div>
            </div>
            {/* 生活指数卡片 */}
            <div className='w-[205px] h-[205px] overflow-hidden grid grid-cols-2 grid-rows-2 gap-1 rounded-3xl'>
                {suggestions.map((item) => (
                    <ConfigProvider
                        tooltip={{
                            unique: true,
                        }}>
                        <Tooltip title={item.text}>
                            <div key={item.type} className='contentStyle'>
                                <h1 className='text-[18px]'>{item.name}</h1>
                                <p>{item.category}</p>
                            </div>
                        </Tooltip>
                    </ConfigProvider>
                ))}
            </div>
        </div>
    )
}
