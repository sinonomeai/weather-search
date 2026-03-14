const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = "https://p35khw3dwx.re.qweatherapi.com"
const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
export const getWeather = async (cityName: string) => {
    const cityRes = await fetch(
        `${BASE_URL}/geo/v2/city/lookup?location=${encodeURIComponent(cityName)}&key=${API_KEY}`,
    )
    if (!cityRes.ok) {
        throw new Error("城市数据请求失败")
    }

    let nameData
    try {
        nameData = await cityRes.json()
    } catch {
        throw new Error("服务器返回城市数据格式错误")
    }

    if (!nameData.location) {
        throw new Error("未找到相关城市")
    }
    const cityID = nameData.location[0].id
    const cityInfo = nameData.location[0]
    await delay(1000)
    const [weatherRes, dailyRes, hourlyRes, indicesRes] = await Promise.all([
        fetch(`${BASE_URL}/v7/weather/now?location=${cityID}&key=${API_KEY}`),
        fetch(`${BASE_URL}/v7/weather/7d?location=${cityID}&key=${API_KEY}`),
        fetch(`${BASE_URL}/v7/weather/24h?location=${cityID}&key=${API_KEY}`),
        fetch(`${BASE_URL}/v7/indices/1d?location=${cityID}&type=1,2,3,5&key=${API_KEY}`),
    ])
    if (!weatherRes.ok || !dailyRes.ok || !hourlyRes.ok || !indicesRes.ok) {
        throw new Error("城市天气数据请求失败")
    }

    try {
        const [weatherData, dailyData, hourlyData, indicesData] = await Promise.all([
            weatherRes.json(),
            dailyRes.json(),
            hourlyRes.json(),
            indicesRes.json(),
        ])
        return {
            city: cityInfo,
            realtime: weatherData.now,
            forecast7d: dailyData.daily,
            forecast24h: hourlyData.hourly,
            lifeIndices: indicesData.daily,
        }
    } catch {
        throw new Error("服务器返回天气数据格式错误")
    }
}
