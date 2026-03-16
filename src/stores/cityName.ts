import { create } from "zustand"
export const useCityData = create((set) => ({
    cityData: "北京",
    setCityData: (data: string) => {
        set({ cityData: data })
    },
}))
