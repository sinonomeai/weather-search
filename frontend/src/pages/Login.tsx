import { Link, useNavigate } from "react-router-dom"
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"
import { Input, message } from "antd"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useUserData } from "../stores/userData"
import { getUser } from "../api/User"
import { useTranslation } from "react-i18next";

//提交按钮组件
const SubmitButton = () => {
    const { t } = useTranslation();
    const { pending } = useFormStatus()
    return (
        <button
            type='submit'
            className='bg-[linear-gradient(120deg,#8fe0ff,#6f9bff)] text-white font-semibold tracking-wider uppercase w-full rounded-full mt-3 py-2 px-4 hover:opacity-90 transition-opacity cursor-pointer'
            disabled={pending}>
            {pending ? t("loginPage-button-loading") : t("loginPage-button")}
        </button>
    )
}

//登录组件
export const Login = () => {
    const { t } = useTranslation();
    const { userData,setUserData } = useUserData()
    const navigate = useNavigate()
    const handleAction = async (_prevState: any, formData: FormData) => {
        const username = formData.get("username") as string
        const password = formData.get("password") as string
        const result = await getUser(username, password)
        console.log(userData)
        if (result.success) {
            message.success(result.message)
            setUserData(result.user!) //! 断言非空
            console.log(userData)
            if(result.user?.role === "admin"){
                navigate("/admin")
            }else if(result.user?.role === "user"){
                navigate(`/${result.user.id}`)
            }else{
                navigate("/")
            }
        } else {
            message.error(result.message) // 这里应该执行
        }
    }

    const [_state, submitAction, _isPending] = useActionState(handleAction, null)

    return (
        <div className='h-screen w-full flex items-center justify-center'>
            {/* 登录框 */}
            <div className='backgroundStyle flex flex-col gap-7 items-center justify-center h-11/20 w-1/4 min-h-[450px] min-w-[350px]'>
                {/* 标题 */}
                <h2 className='text-2xl font-bold'>{t("loginPage-title")}</h2>

                {/* 表单部分 */}
                <form className='w-3/4 flex flex-col gap-3' action={submitAction}>
                    {/* 用户名输入框 */}
                    <div className='w-full flex flex-col gap-2'>
                        <label className='block text-white/70'>{t("loginPage-username")}</label>
                        <Input
                            autoFocus
                            size='large'
                            placeholder={t("loginPage-usernameInput")}
                            prefix={<UserOutlined />}
                            name='username'
                            required
                        />
                    </div>

                    {/* 密码输入框 */}
                    <div className='w-full flex flex-col gap-2'>
                        <label className='block text-white/70'>{t("loginPage-password")}</label>
                        <Input.Password
                            size='large'
                            placeholder={t("loginPage-passwordInput")}
                            prefix={<UserOutlined />}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            name='password'
                            autoComplete='new-password' // 禁止浏览器自动填充密码
                            required
                        />
                    </div>

                    {/* 提交按钮 */}
                    <SubmitButton />
                </form>

                {/* 其他链接 */}
                <div className='flex flex-col gap-3 items-center justify-center w-3/4'>
                    <Link
                        to='/register'
                        className='text-blue-400 hover:text-blue-300 transition-colors'>
                        <p>{t("loginPage-register")}</p>
                    </Link>
                    <Link to='/' className='text-gray-400 hover:text-gray-300 transition-colors'>
                        <p>{t("loginPage-return")}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
