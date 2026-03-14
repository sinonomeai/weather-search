import { useWeatherData } from "../store/weatherData"

export const IconFont = () => {
    const { weatherData } = useWeatherData()
    const IconData = weatherData?.forecast24h
    const Icons = IconData.map((item) => item.icon)
    return (
        <div className="flex gap-7 pl-10">
            {Icons.map((item,index)=>(
            <div key={index}>
                <i className={`qi-${item} text-[18px]`}></i>
            </div>))}
        </div>
        )
}
