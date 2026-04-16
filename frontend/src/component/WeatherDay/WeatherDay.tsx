import { TempChart } from "./TempChart"
import { Skeleton } from "antd"
import { useWeather } from "../../hooks/useWeather"
import { useCityData } from "../../stores/cityData"
import { useTranslation } from "react-i18next";
export const WeatherDay = () => {
    const { t } = useTranslation();
    const { cityData } = useCityData()
    const { isFetching } = useWeather(cityData)
    if (isFetching) {
        return (
            <div className='backgroundStyle h-150 w-9/10 p-5'>
                <div>
                    <p className='titleFont'>{t("title-day")}</p>
                    <Skeleton
                        active
                        paragraph={{ rows: 15, width: ["70%", "80%", "80%", "90%", "100%"] }}
                        title={{ width: "50%" }}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className='backgroundStyle h-150 w-9/10 p-5'>
            <div>
                <p className='titleFont'>{t("title-day")}</p>
                <TempChart />
            </div>
        </div>
    )
}
