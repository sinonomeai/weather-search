import { useContext } from "react"
import { MobileContext } from "../../../hooks/useMobile"

export const FloatingBall = () => {
    const {handleAdd,isAdd} = useContext(MobileContext)
    return (
        <div className={`floating-ball md:hidden ${isAdd ? "hidden" : ""}`}>
            <button
                style={{ fontSize: "28px", color: "white", cursor: "pointer" }}
                onClick={handleAdd}>
                ☰
            </button>
        </div>
    )
}
