import { getWeather } from "../api/getWeather"
import { useQuery } from "@tanstack/react-query"
export const useWeather = (cityName: string) => {
    return useQuery({
        queryKey: ["weather", cityName],
        queryFn: () => getWeather(cityName),
        enabled:false
    })
}
