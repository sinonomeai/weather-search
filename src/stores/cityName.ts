import { create } from "zustand"
export const useCityData = create((set) => ({
    cityData: null,
    setCityData: (data: string) => {
        set({ cityData: data })
    },
}))
