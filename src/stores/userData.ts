import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CityInfo } from "../types/City"
interface User {
    id: string
    role: string
    username: string
    favourCities: CityInfo[]
}
interface UserStore {
    userData: User | null
    setUserData: (data: User | null) => void
}
export const useUserData = create<UserStore>()(
    persist(
        (set) => ({
            userData: null,
            setUserData: (data) => {
                set({ userData: data })
            },
        }),
        {
            name: "userInfo",
        },
    ),
)
