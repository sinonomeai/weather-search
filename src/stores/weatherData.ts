import { create } from "zustand"
export const useWeatherData = create((set) => ({
    weatherData: null,
    setWeatherData: (data:string) => {
        set({ weatherData:data })
    },
}))
