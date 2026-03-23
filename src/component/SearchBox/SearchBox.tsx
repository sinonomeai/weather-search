import { useState } from "react"
import { message } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useCityData } from "../../stores/cityData"
import { useWeather } from "../../hooks/useWeather"

export const SearchBox = () => {
    const { setCityData } = useCityData()
    const [cityName, setCityName] = useState("")
    //解构
    const {
        refetch, // 手动触发请求的方法
        isFetching, // 是否正在请求（包括后台）
    } = useWeather(cityName) // 传入城市名
    //点击搜索
    const handleSearch = async () => {
        if (!cityName.trim()) {
            message.warning("请输入城市名")
            return
        }
        const result = await refetch()
        if (result.data) {
            setCityData(cityName)
            message.success(`${cityName}天气数据获取成功(/≧▽≦)/`)
        } else if (result.error) {
            message.error(result.error.message)
        }
    }

    return (
        <div
            className='backgroundStyle h-30 w-9/10 flex flex-wrap justify-center items-center  max-md:flex-col max-md:h-36
    '>
            <div className='md:flex-1 flex flex-col justify-center pl-10 w-full max-md:pl-5'>
                <p className='text-[20px] tracking-[0.1em]'>城市查询</p>
                <p className='text-[#b4c0d9] text-[14px] '>输入城市或坐标，获取最新天气</p>
            </div>
            <div className='md:flex-3 flex gap-3 pr-5 pt-4 w-full max-md:pl-5'>
                <div className='relative flex-1'>
                    <input
                        type='text'
                        value={cityName}
                        placeholder='搜索城市，例如：北京'
                        className='searchInput outline-none w-full'
                        onChange={(e) => {
                            setCityName(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch()
                        }}
                        // onFocus={() => setIsSearching(true)}
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

                <button className='buttonStyle' onClick={handleSearch} disabled={isFetching}>
                    {isFetching ? <LoadingOutlined style={{ fontSize: 24 }} /> : "搜索"}
                </button>
            </div>
        </div>
    )
}
