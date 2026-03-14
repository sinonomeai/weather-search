const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
import { message, Button } from "antd"
import { useUserData } from "../store/userData"
import { useWeatherData } from "../store/weatherData"

export const CityCollect = () => {
    const { userData, setUserData } = useUserData()
    const { weatherData, setWeatherData } = useWeatherData()

    // 点击收藏城市
    const handleCity = async (cityName: string) => {
        try {
            const resOfID = await fetch(
                `https://p35khw3dwx.re.qweatherapi.com/geo/v2/city/lookup?location=${encodeURIComponent(cityName)}&key=${API_KEY}`,
            )
            const nameData = await resOfID.json()
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
                return { success: true, data: fullWeatherData }
            } catch (error) {
                message.error("该城市天气获取失败")
                return {
                    success: false,
                    error: "天气数据获取失败",
                    type: "天气获取失败",
                }
            }
        } catch (error) {
            message.error("搜索失败")
            return {
                success: false,
                error: "网络请求失败，请检查网络连接后重试",
                type: "网络错误",
            }
        }
    }

    // 添加收藏城市
    const handleAdd = async () => {
        if (!userData) {
            message.error("请先登录")
            return {
                success: false,
                message: "无用户数据",
            }
        }
        if (!weatherData) {
            message.error("请先搜索城市")
            return {
                success: false,
                message: "无天气数据",
            }
        }

        const cityInfo = weatherData.city
        const cities = userData.favourCities || []

        if (cities.find((c) => c.name === cityInfo.name)) {
            message.error("已收藏该城市")
            return {
                message: "该城市已收藏",
                success: false,
            }
        }

        try {
            const newCity = {
                id: cityInfo.id,
                name: cityInfo.name,
                country: cityInfo.country,
                addedAt: new Date().toISOString(),
            }

            const res = await fetch(`http://localhost:3000/users/${userData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favourCities: [...(userData.favourCities || []), newCity],
                }),
            })

            if (res.ok) {
                const updatedUser = await res.json()
                setUserData(updatedUser)
                message.success("收藏成功")
            } else {
                message.error("收藏失败")
            }
        } catch (error) {
            console.error("收藏失败:", error)
            message.error("收藏失败")
            return {
                message: "收藏失败",
                success: false,
            }
        }
    }

    // 移除收藏城市
    const handleRemove = async (cityName: string) => {
        try {
            const newCities = userData.favourCities.filter((c) => c.name !== cityName)
            const res = await fetch(`http://localhost:3000/users/${userData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favourCities: newCities,
                }),
            })

            const updatedUser = await res.json()
            setUserData(updatedUser)
            message.success("移除成功")
        } catch (error) {
            console.error("删除失败:", error)
            message.error("删除失败")
            return {
                message: "删除失败",
                success: false,
            }
        }
    }

    if (!userData) {
        return (
            <div className='h-9/10 w-full'>
                <h1 className='text-2xl font-bold mb-4 p-3'>我的收藏</h1>
                <div className='flex items-center justify-center h-40'>
                    <p className='text-gray-400 text-lg'>
                        {weatherData ? "请先登录" : "请先登录，并搜索城市"}
                    </p>
                </div>
            </div>
        )
    }

    if (!weatherData) {
        return (
            <div className='h-9/10 w-full'>
                <h1 className='text-2xl font-bold mb-4 p-3'>我的收藏</h1>
                <div className='flex items-center justify-center h-40'>
                    <p className='text-gray-400 text-lg'>请先搜索城市</p>
                </div>
            </div>
        )
    }

    const cityInfo = weatherData.city
    const cities = userData.favourCities || []

    return (
        <div className='h-9/10 w-full '>
            <h1 className='text-[clamp(18px,1vw,20px)] font-bold text-center my-4'>我的收藏</h1>

            {weatherData && userData && (
                <div className='flex flex-col gap-10'>
                    <div className='w-full h-[240px] overflow-auto rounded-xl'>
                        <ul className='w-full h-full border-0 divide-y divide-gray-200'>
                            {cities.map((item) => (
                                <li
                                    className='flex justify-between items-center py-3 group cursor-pointer'
                                    onClick={() => handleCity(item.name)}
                                    key={item.name}>
                                    <p className='pl-[5px] text-gray-800 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200'>
                                        {item.name}
                                    </p>
                                    <button
                                        className='pr-[10px] cursor-pointer opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200 text-xl'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemove(item.name)
                                        }}>
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex justify-center'>
                        <div className='max-w-[150px] min-w-[120px] '>
                            <Button
                                color='primary'
                                variant='solid'
                                block='true'
                                onClick={handleAdd}>
                                <span className='text-[clamp(13px,1vw,16px)]'>
                                    添加当前城市({cityInfo.name})
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
