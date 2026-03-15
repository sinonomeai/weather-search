import { useCityData } from "../../stores/cityName"
import { useWeather } from "../../hooks/useWeather"

export const IconFont = () => {
    const {cityData} = useCityData()
    const {data:weatherData} = useWeather(cityData)
    const IconData = weatherData?.forecast24h
    const Icons = IconData.map((item) => item.icon)
    return (
        <div className='flex gap-7 pl-8'>
            {Icons.map((item, index) => (
                <div key={index}>
                    <i className={`qi-${item} text-[18px]`}></i>
                </div>
            ))}
        </div>
    )
}
