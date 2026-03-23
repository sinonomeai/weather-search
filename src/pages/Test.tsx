import { Menu } from "../component/Siderbar/Mobile/Menu"
import { FloatingBall } from "../component/Siderbar/Mobile/FloatingBall"
import { useState } from "react"
export const Test = () => {
    const [isAdd, setIsAdd] = useState(false)
    const handleAdd = () => {
        setIsAdd(!isAdd)
    }
    const handleRemove = () => {
        setIsAdd(!isAdd)
    }
    
    return (
        <>
            <FloatingBall handleAdd={handleAdd}/>
            <Menu handleRemove={handleRemove} isAdd={isAdd} />
        </>
    )
}
