import { Link, useNavigate } from "react-router-dom"
import { useUserData } from "../../stores/userData"
import { message } from "antd"
import { useTranslation } from "react-i18next";
export const HomeLogin = () => {
    const { t } = useTranslation();
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
        <div className='h-18 w-full text-center'>
            {userData ? (
                <div className='flex flex-col gap-2'>
                    <h1 className='text-[20px]'>{userData.username}</h1>
                    <div className='flex gap-1 justify-center text-[clamp(14px,1vw,16px)]'>
                        <button
                            className='cursor-pointer hover:text-blue-300'
                            onClick={handleLogout}>
                            {t("logout")}
                        </button>
                        <span>/</span>
                        <button
                            className='cursor-pointer hover:text-blue-300'
                            onClick={() => navigate("/login")}>
                            {t("switch-account")}
                        </button>
                    </div>
                </div>
            ) : (
                <div className='w-full h-full flex gap-1 justify-center'>
                    <Link to='/login'>
                        <h1 className='text-[20px]'>{t("login")}</h1>
                    </Link>
                    <span className='text-[20px]'>/</span>
                    <Link to='/register'>
                        <h1 className='text-[20px]'>{t("register")}</h1>
                    </Link>
                </div>
            )}
        </div>
    )
}
