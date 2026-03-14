import { create } from "zustand"
export const useWeatherData = create((set) => ({
    weatherData: null,
    pendingData: false,
    setWeatherData: (data) => {
        set({ weatherData: data })
    },
    setPendingData: (data) => {
        set({ pendingData: data })
    },
}))
