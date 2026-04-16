import { create } from "zustand"
interface CityStore{
    cityData:string,
    setCityData:(data:string)=>void
}
export const useCityData = create<CityStore>((set) => ({
    cityData: "北京",
    setCityData: (data) => {
        set({ cityData: data })
    },
}))
