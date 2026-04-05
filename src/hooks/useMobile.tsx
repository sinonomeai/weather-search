import { createContext, useState } from "react"
export const MobileContext = createContext<{
    isAdd: boolean
    handleAdd: () => void
    handleRemove: () => void
}>({
    isAdd: false,
    handleAdd: () => {},
    handleRemove: () => {},
})
export const MobileProvider = ({ children }:{ children: React.ReactNode }) => {
     const [isAdd, setIsAdd] = useState(false)
     const handleAdd = () => {
         setIsAdd(!isAdd)
     }
     const handleRemove = () => {
         setIsAdd(!isAdd)
     }
    return (
        <MobileContext.Provider value={{ isAdd, handleAdd, handleRemove }}>
            {children}
        </MobileContext.Provider>
    )
}