import { getWeather } from "../api/getWeather"
import { useQuery } from "@tanstack/react-query"
export const useWeather = (cityName: string) => {
    const query = useQuery({
        queryKey: ["weather", cityName],
        queryFn: async() =>{
            const result = await getWeather(cityName)
            if("message" in result){
                throw new Error(result.message)
            }
            return result
        },
        enabled: false,
    })
    return query
}
