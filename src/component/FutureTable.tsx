import { useWeatherData } from "../store/weatherData"
export const FutureTable = () => {
    const { weatherData } = useWeatherData()
    if (!weatherData) {
        return (
            <div
                className='w-full h-full p-10 flex items-center justify-center'>
                <p className='text-gray-400 text-[30px]'>暂无数据，请先搜索城市</p>
            </div>
        )
    }
    const futureData = weatherData?.forecast7d
    return (
        <div className='w-full h-80 rounded-xl overflow-auto border border-black/50'>
            <table className='w-full min-w-[565px] border-collapse rounded'>
                <thead className='sticky top-0'>
                    <tr>
                        <th className='tableTh'>日期</th>
                        <th className='tableTh'>天气</th>
                        <th className='tableTh'>最高温</th>
                        <th className='tableTh'>最低温</th>
                        <th className='tableTh'>风速</th>
                        <th className='tableTh'>湿度</th>
                        <th className='tableTh'>紫外线</th>
                    </tr>
                </thead>
                <tbody>
                    {futureData.map((item) => (
                        <tr key={item.fxDate}>
                            <td className='tableTd'>{item.fxDate}</td>
                            <td className='tableTd'>{item.textDay}</td>
                            <td className='tableTd'>{item.tempMax}°</td>
                            <td className='tableTd'>{item.tempMin}°</td>
                            <td className='tableTd'>{item.windSpeedDay}m/s</td>
                            <td className='tableTd'>{item.humidity}%</td>
                            <td className='tableTd'>{item.uvIndex}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
