const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
import { useState, useActionState } from "react"
import { useFormStatus } from "react-dom"
import { message } from "antd"
import { useWeatherData } from "../store/weatherData"

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
export const SearchBox = () => {
    const [isSearching, setIsSearching] = useState(false)
    const {pending} = useFormStatus()
    const { setWeatherData, setPendingData } = useWeatherData()
    
    //搜索城市
    const handleAction = async (_prevState: any, formData: FormData) => {
        const cityName = formData.get("cityName")
        if (!cityName || cityName.trim() === "") {
            message.open({
                type: "error",
                content: "请输入城市名(￣▽￣)",
            })
            return {
                success: false,
                error: "请输入城市名",
                type: "空白输入",
            }
        }
        //获取天气地址
        try {
            const resOfID = await fetch(
                `https://p35khw3dwx.re.qweatherapi.com/geo/v2/city/lookup?location=${encodeURIComponent(cityName)}&key=${API_KEY}`,
            )
            delay(2000)
            const nameData = await resOfID.json()
            if (!nameData.location) {
                message.open({
                    type: "warning",
                    content: `未找到城市 "${cityName}" (。﹏。*)`,
                })
                return {
                    success: false,
                    error: "未找到相关城市",
                    type: "无结果",
                }
            }
            const cityID = nameData.location[0].id
            const cityInfo = nameData.location[0]
            try {
                const [weatherRes, dailyRes, hourlyRes, indicesRes] = await Promise.all([
                    fetch(
                        `https://p35khw3dwx.re.qweatherapi.com/v7/weather/now?location=${cityID}&key=${API_KEY}`,
                    ),
                    fetch(
                        `https://p35khw3dwx.re.qweatherapi.com/v7/weather/7d?location=${cityID}&key=${API_KEY}`,
                    ),
                    fetch(
                        `https://p35khw3dwx.re.qweatherapi.com/v7/weather/24h?location=${cityID}&key=${API_KEY}`,
                    ),
                    fetch(
                        `https://p35khw3dwx.re.qweatherapi.com/v7/indices/1d?location=${cityID}&type=1,2,3,5&key=${API_KEY}`,
                    ),
                ])
                const weatherData = await weatherRes.json()
                const dailyData = await dailyRes.json()
                const hourlyData = await hourlyRes.json()
                const indicesData = await indicesRes.json()

                const fullWeatherData = {
                    city: cityInfo,
                    realtime: weatherData.now,
                    forecast7d: dailyData.daily,
                    forecast24h: hourlyData.hourly,
                    lifeIndices: indicesData.daily,
                }

                setWeatherData(fullWeatherData)
                setPendingData(pending)
                return { success: true, data: fullWeatherData }
            } catch (error) {
                message.open({
                    type: "error",
                    content: "该城市天气获取失败",
                })
                return {
                    success: false,
                    error: "天气数据获取失败",
                    type: "天气获取失败",
                }
            }
        } catch (error) {
            message.open({
                type: "error",
                content: "搜索失败",
            })
            return {
                success: false,
                error: "网络请求失败，请检查网络连接后重试",
                type: "网络错误",
            }
        }
    }
    const [state, submitAction, isPending] = useActionState(handleAction, null)

    //获取关联城市
    const handleChange = (e) => {
        const value = e.target.value
    }

    return (
        <div
            className='backgroundStyle h-30 w-9/10 flex flex-wrap justify-center items-center  max-md:flex-col max-md:h-36
    '
            style={{
                background: "var(--card-gradient)",
            }}>
            <div className='min-md:flex-1 flex flex-col justify-center pl-5 max-md:w-full max-md:pl-10'>
                <p className='text-[20px] tracking-[0.1em]'>城市查询</p>
                <p className='text-[#b4c0d9] text-[14px] line-clamp-2'>
                    输入城市或坐标，获取最新天气
                </p>
            </div>
            <form
                action={submitAction}
                className='min-md:flex-3 flex gap-3 pr-10 pt-4 max-md:w-full max-md:pl-10'>
                <div className='relative flex-1'>
                    <input
                        type='text'
                        placeholder='搜索城市，例如：北京'
                        className='searchInput outline-none w-full'
                        name='cityName'
                        onChange={handleChange}
                        onFocus={() => setIsSearching(true)}
                    />

                    {/* {isSearching && (
                        <div
                            className='absolute left-0 right-0 mt-1 rounded-3xl bg-[rgba(0,0,0,0.1)] z-50 overflow-hidden'
                            onClick={() => setIsSearching(false)}>
                            <ul>
                                <li className='searchingLi'>北京</li>
                                <li className='searchingLi'>上海</li>
                                <li className='searchingLi'>成都</li>
                            </ul>
                        </div>
                    )} */}
                </div>
                <button className='buttonStyle' type='submit'>
                    {isPending ? "搜索中..." : "搜索"}
                </button>
            </form>
        </div>
    )
}
