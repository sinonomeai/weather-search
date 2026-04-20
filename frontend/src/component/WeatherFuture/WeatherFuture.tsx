import { Skeleton } from "antd"
import { FutureTable } from "./FutureTable"
import { useWeather } from "../../hooks/useWeather"
import { useCityData } from "../../stores/cityData"
import { useTranslation } from "react-i18next";
export const WeatherFuture = () => {
     const { t } = useTranslation();
    const { cityData } = useCityData()
    const { isFetching } = useWeather(cityData)
    if (isFetching) {
        return (
            <div className='backgroundStyle h-110 w-9/10 p-5'>
                <div className='flex flex-col h-full w-full'>
                    <p className='titleFont'>{t("title-future")}</p>
                    <Skeleton
                        active
                        paragraph={{ rows: 10, width: ["70%", "80%", "100%", "100%"] }}
                        title={{ width: "50%" }}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className='backgroundStyle h-110 w-19/20 p-5'>
            <div className='flex flex-col h-full w-full'>
                <p className='titleFont'>{t("title-future")}</p>
                <FutureTable />
            </div>
        </div>
    )
}
