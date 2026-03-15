const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = "https://p35khw3dwx.re.qweatherapi.com"
export const getWeather = async (cityName: string) => {
    try {
        let cityRes
        try {
            cityRes = await fetch(
                `${BASE_URL}/geo/v2/city/lookup?location=${encodeURIComponent(cityName)}&key=${API_KEY}`,
            )
        } catch {
            throw new Error("网络连接失败，请检查网络设置")
        }
        if (cityRes.status === 400) {
            throw new Error("未匹配到相应城市")
        }
        if (!cityRes.ok) {
            throw new Error("服务器相应错误")
        }
        const nameData = await cityRes.json()
        const cityID = nameData.location[0].id
        const cityInfo = nameData.location[0]
        const [weatherRes, dailyRes, hourlyRes, indicesRes] = await Promise.all([
            fetch(`${BASE_URL}/v7/weather/now?location=${cityID}&key=${API_KEY}`),
            fetch(`${BASE_URL}/v7/weather/7d?location=${cityID}&key=${API_KEY}`),
            fetch(`${BASE_URL}/v7/weather/24h?location=${cityID}&key=${API_KEY}`),
            fetch(`${BASE_URL}/v7/indices/1d?location=${cityID}&type=1,2,3,5&key=${API_KEY}`),
        ])
        if (!weatherRes.ok || !dailyRes.ok || !hourlyRes.ok || !indicesRes.ok) {
            throw new Error("城市天气数据请求失败")
        }
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
    } catch (error) {
        return {
            message: `请求失败:${error instanceof Error ? error.message : "网络错误"}`,
        }
    }
}
