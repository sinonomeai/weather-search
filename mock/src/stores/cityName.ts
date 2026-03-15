import { create } from "zustand"
export const useCityData = create((set) => ({
    cityData: "",
    setCityData: (data: string) => {
        set({ cityData: data })
    },
}))
