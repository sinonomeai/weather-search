import { Link, useNavigate } from "react-router-dom"
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"
import { Input, message } from "antd"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

//定义用户接口，防止类型不匹配，"报错"
interface User {
    username: string
    password: string
}
//模拟请求延迟
const delay = (ms: number) => {
    //resolve是一个函数，通过调用可以告诉Promise对象当前操作已经完成，如果不调用,Promise对象会一直处于pending状态。
    //展开为()=>resolve()
    return new Promise((resolve) => setTimeout(resolve, ms))
}

//提交按钮组件
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
    const navigate = useNavigate() //只能在组件顶层使用
    //注册处理函数
    const handleAction = async (_prevState: any, formData: FormData) => {
        const username = formData.get("username")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirmPassword")
        try {
            //检查用户名是否为空
            if (username.trim() === "") {
                message.open({
                    type: "error",
                    content: "用户名不能为空￣へ￣",
                })
                return {
                    message: "用户名为空",
                    success: false,
                }
            }
            if (password.trim() === "") {
                message.open({
                    type: "error",
                    content: "密码不能为空￣へ￣",
                })
                return {
                    message: "密码为空",
                    success: false,
                }
            }
            //检查用户名是否存在
            const resCheck = await fetch("http://localhost:3000/users")
            if (!resCheck.ok) {
                throw new Error("网络请求失败")
            }
            const users: User[] = await resCheck.json()
            if (users.find((u) => u.username === username)) {
                message.open({
                    type: "error",
                    content: "用户名已存在",
                })
                return {
                    message: "用户名已存在",
                    success: false,
                }
            }
            //检查两次密码是否一致
            if (password !== confirmPassword) {
                message.open({
                    type: "error",
                    content: "两次输入密码不一致，请重新输入",
                })
                return {
                    message: "两次输入的密码不一致",
                    success: false,
                }
            }
            //创建新用户
            const newUser = {
                id: Date.now().toString(), //使用时间戳作为简单的唯一ID
                username: username,
                password: password,
                role: "user",
                createdAt: new Date().toISOString(), //记录创建时间(以ISO格式存储)
                favourCities: [],
            }
            //发送POST请求到服务器
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
            
            if (!res.ok) {
                throw new Error("网络请求失败")
            }
            await delay(2000)

            message.open({
                type: "success",
                content: "注册成功",
            })
            navigate("/login")
            return {
                message: "注册成功",
                success: true,
            }
        } catch (error) {
            message.open({
                type: "error",
                content: "注册失败 " + error, 
            })
            return {
                message: "注册失败 " + error,
                success: false,
            }
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
