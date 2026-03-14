import { message, Button } from "antd"
import { useUserData } from "../../stores/userData"
import { useCityData } from "../../stores/cityName"
import { useWeather } from "../../hooks/useWeather"
import { useEffect } from "react"
export const CityCollect = () => {
    const { userData, setUserData } = useUserData()
    const { cityData, setCityData } = useCityData()
    const { data: weatherData, refetch,isLoading } = useWeather(cityData)

    // 根据用户登录和天气数据状态，显示相应提示
    if (!userData) {
        return (
            <div className='h-9/10 w-full'>
                <h1 className='text-2xl font-bold mb-4'>我的收藏</h1>
                <div className='flex items-center justify-center h-40'>
                    <p className='text-gray-400 text-lg'>
                        {weatherData ? "请先登录" : "请先登录，并搜索城市"}
                    </p>
                </div>
            </div>
        )
    }
    useEffect(() => {
        refetch()
    }, [cityData])
    // 点击收藏城市更新最新城市数据

    const handleCity = (cityName: string) => {
        setCityData(cityName)
    }
    // 添加收藏城市
    const cityInfo = weatherData?.city
    const cities = userData?.favourCities
    const handleAdd = async () => {
        if (!weatherData) {
            message.error("请先搜索城市")
            return {
                success: false,
                message: "未搜索城市",
            }
        }

        if (cities.find((city: any) => city.name === cityInfo.name)) {
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
                    favourCities: [...userData.favourCities, newCity],
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
            const newCities = userData.favourCities.filter((city: any) => city.name !== cityName)
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

    return (
        <div className='h-9/10 w-full '>
            <h1 className='text-[clamp(18px,1vw,20px)] font-bold text-center my-4'>我的收藏</h1>

            {userData && (
                <div className='flex flex-col gap-10'>
                    <div className='w-full h-[240px] overflow-auto rounded-xl'>
                        <ul className='w-full h-full border-0 divide-y divide-gray-200'>
                            {cities.map((item: any) => (
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
                        <div className='max-w-[150px] min-w-[100px] '>
                            <Button
                                color='primary'
                                variant='solid'
                                block='true'
                                onClick={handleAdd}>
                                {weatherData ? (
                                    <span className='text-[clamp(10px,1vw,14px)]'>
                                        添加当前城市({cityInfo.name})
                                    </span>
                                ) : (
                                    <span className='text-[clamp(13px,1vw,16px)]'>
                                        请先搜索城市
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
