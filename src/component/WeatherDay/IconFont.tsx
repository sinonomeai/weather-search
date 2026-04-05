import { useCityData } from "../../stores/cityData"
import { useWeather } from "../../hooks/useWeather"

export const IconFont = () => {
    const { cityData } = useCityData()
    const { data: weatherData } = useWeather(cityData)
    const IconData = weatherData?.forecast24h
    const Icons = IconData.map((item:any) => item.icon)
    return (
        <div className='flex gap-7 pl-13'>
            {Icons.map((item:any, index:number) => (
                <div key={index}>
                    <i className={`qi-${item} text-[18px]`}></i>
                </div>
            ))}
        </div>
    )
}
