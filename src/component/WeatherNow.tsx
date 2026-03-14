import { CityWeather } from "./CityWeather"
import { WeatherCard } from "./WeatherCard"
export const WeatherNow = () => {
    return (
        <div
            className='backgroundStyle min-h-120 w-9/10 p-5 flex gap-5'
            style={{
                background: "var(--card-gradient)",
            }}>
            <div className='flex-1 border-r-[1px] border-r-white/20'>
                <p className='titleFont'>当前天气状况</p>
                <div>
                    <CityWeather />
                </div>
            </div>
            <div className='flex-3'>
                <WeatherCard />
            </div>
        </div>
    )
}
