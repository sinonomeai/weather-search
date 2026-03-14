import { useWeatherData } from "../store/weatherData"
import { pinyin } from "pinyin-pro"
export const CityWeather = () => {
    const { weatherData } = useWeatherData()
    if (!weatherData) {
        return (
            <div className='w-full h-60'>
                <div className='w-full h-full pt-17 text-center flex items-center justify-center'>
                    <p className='text-gray-400 text-[30px]'>暂无数据</p>
                </div>
            </div>
        )
    }
    const nowData = weatherData?.realtime
    const cityInfo = weatherData?.city
    const nameText = pinyin(cityInfo.name, {
        toneType: "none",
        type: "string",
    })
    return (
        <div className=''>
            <p className='titleCity'>
                {nameText} · {cityInfo.name}
            </p>
            <p>
                <span className='text-[clamp(35px,5vw,100px)]'>{nowData.temp}°</span>
                <span className='text-[clamp(30px,4vw,90px)]'>C</span>
            </p>
            <div className='flex flex-wrap gap-3 text-[clamp(20px,2vw,40px)]'>
                <i className={`qi-${nowData.icon} `}></i>
                <span className=''>·</span>
                <p className=''>{nowData.text}</p>
            </div>
        </div>
    )
}
