import { create } from "zustand"
export const useUserData = create((set) => ({
    userData: null,
    setUserData: (data) => {
        set({ userData: data })
    },
}))
