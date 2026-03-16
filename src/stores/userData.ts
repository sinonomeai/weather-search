import { create } from "zustand"
interface User {
        id: number
        role: string
        username: string
        favourCities:string[]
}
interface UserStore {
    userData: User | null
    setUserData: (data: User | null) => void
}
export const useUserData = create<UserStore>((set) => ({
    userData: null,
    setUserData: (data) => {
        set({ userData: data })
    },
}))