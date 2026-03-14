import { Link, useNavigate } from "react-router-dom"
import { useUserData } from "../store/userData"
import {  message } from "antd"
export const HomeLogin = () => {
    const { userData, setUserData } = useUserData()
    const navigate = useNavigate()
    const handleLogout = () => {
        setUserData(null)
        message.open({
            type: "success",
            content: "退出成功",
        })
        navigate("/")
    }
    return (
        <div className='h-1/10 w-full text-center'>
            {userData ? (
                <div className='flex flex-col gap-2'>
                    <h1 className='text-[20px]'>{userData.username}</h1>
                    <div className='flex gap-1 justify-center text-[clamp(14px,1vw,16px)]'>
                        <button
                            className='cursor-pointer hover:text-blue-300'
                            onClick={handleLogout}>
                            退出登录
                        </button>
                        <span>/</span>
                        <button
                            className='cursor-pointer hover:text-blue-300'
                            onClick={() => navigate("/login")}>
                            切换账号
                        </button>
                    </div>
                </div>
            ) : (
                <div className='w-full h-full flex gap-1 justify-center'>
                    <Link to='/login'>
                        <h1 className='text-[20px]'>登录</h1>
                    </Link>
                    <span className='text-[20px]'>/</span>
                    <Link to='/register'>
                        <h1 className='text-[20px]'>注册</h1>
                    </Link>
                </div>
            )}
        </div>
    )
}
