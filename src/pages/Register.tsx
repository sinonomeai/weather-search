import { Link, useNavigate } from "react-router-dom"
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"
import { Input, message } from "antd"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { postUser } from "../api/User"
const SubmitButton = () => {
    const { pending } = useFormStatus()
    return (
        <button
            type='submit'
            className='bg-[linear-gradient(120deg,#8fe0ff,#6f9bff)] text-white font-semibold tracking-wider uppercase w-full rounded-full mt-3 py-2 px-4 hover:opacity-90 transition-opacity cursor-pointer'
            disabled={pending}>
            {pending ? "注册中..." : "注册"}
        </button>
    )
}

export const Register = () => {
    const navigate = useNavigate()
    const handleAction = async (_prevState: any, formData: FormData) => {
        const username = formData.get("username")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirmPassword")
        const result = await postUser(username, password, confirmPassword)
        if (result.success) {
            message.success(result.message)
            navigate("/login")
            return
        } else {
            message.error(result.message)
            return
        }
    }

    const [state, submitAction, isPending] = useActionState(handleAction, null)
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            {/* 注册框 */}
            <div className='backgroundStyle flex flex-col gap-7 items-center justify-center  h-11/20 w-1/4 min-h-[450px] min-w-[350px]'>
                {/* 标题 */}
                <h2 className='text-2xl font-bold'>注册新用户</h2>

                {/* 表单部分 */}
                <form className='w-3/4 flex flex-col gap-3' action={submitAction}>
                    {/* 用户名输入框 */}
                    <div className='w-full flex flex-col gap-2'>
                        <label className='block text-white/70'>用户名</label>
                        <Input
                            autoFocus
                            size='large'
                            placeholder='请输入用户名'
                            prefix={<UserOutlined />}
                            name='username'
                            required
                        />
                    </div>

                    {/* 密码输入框 */}
                    <div className='w-full flex flex-col gap-2'>
                        <label className='block text-white/70'>密码</label>
                        <Input.Password
                            size='large'
                            placeholder='请输入密码'
                            prefix={<UserOutlined />}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            name='password'
                            autoComplete='new-password'
                            required
                        />
                    </div>
                    {/* 确认密码输入框 */}
                    <div className='w-full flex flex-col gap-2'>
                        <label className='block text-white/70'>确认密码</label>
                        <Input.Password
                            size='large'
                            placeholder='请再次输入密码'
                            prefix={<UserOutlined />}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            name='confirmPassword'
                            autoComplete='new-password'
                            required
                        />
                    </div>

                    {/* 提交按钮 */}
                    <SubmitButton />
                </form>

                {/* 其他链接 */}
                <div className='flex flex-col gap-3 items-center justify-center w-3/4'>
                    <Link
                        to='/login'
                        className='text-blue-400 hover:text-blue-300 transition-colors'>
                        <p>已有账号？去登录</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
