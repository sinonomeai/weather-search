import { TempChart } from "./TempChart"
import { Skeleton } from "antd"
import { useWeather } from "../../hooks/useWeather"
import { useCityData } from "../../stores/cityData"
import { useTranslation } from "react-i18next";
export const WeatherDay = () => {
    const { t } = useTranslation();
    const { cityData } = useCityData()
    const { isFetching } = useWeather(cityData)
    
    return (
      <div className='backgroundStyle h-150 w-19/20 p-5'>
        <div>
          <p className='titleFont'>{t("title-day")}</p>
          {isFetching ? (
            <Skeleton
              active
              paragraph={{ rows: 15, width: ["70%", "80%", "80%", "90%", "100%"] }}
              title={{ width: "50%" }}
            />
          ) : (
            <TempChart />
          )}
        </div>
      </div>
    );
}
