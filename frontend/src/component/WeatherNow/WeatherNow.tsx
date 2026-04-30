import { Skeleton } from "antd";
import { useWeather } from "../../hooks/useWeather";
import { useCityData } from "../../stores/cityData";
import { CityWeather } from "./CityWeather";
import { WeatherCard } from "./WeatherCard";
import { useTranslation } from "react-i18next";
export const WeatherNow = () => {
  const { t } = useTranslation();
  const { cityData } = useCityData();
  const { isFetching } = useWeather(cityData);

  return (
    <div
      className='backgroundStyle min-h-120 w-19/20 p-5 flex flex-col'
      style={{
        background: "var(--card-gradient)",
      }}>
      <p className='titleFont'>{t("title-now")}</p>
      {isFetching ? (
        <Skeleton
          active
          paragraph={{ rows: 12, width: ["70%", "80%", "100%", "100%"] }}
          title={{ width: "50%" }}
        />
      ) : (
        <div className='flex-1 flex gap-5'>
          <div className='flex-1 border-r-[1px] border-r-white/20'>
            <div>
              <CityWeather />
            </div>
          </div>
          <div className='flex-3'>
            <WeatherCard />
          </div>
        </div>
      )}
    </div>
  );
};
