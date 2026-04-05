import { create } from "zustand"
interface ThemeStore{
    cityData: string,
    setCityData: (data:string) => void
}
export const useThemeData = create<ThemeStore>((set) => ({
    cityData: "dark",
    setCityData: (data:string) => {
        set({ cityData: data })
    },
}))
