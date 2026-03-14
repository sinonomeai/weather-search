import { Link, useNavigate } from "react-router-dom"
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"
import { Input, message } from "antd"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useUserData } from "../stores/userData"

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
            {pending ? "登录中..." : "登录"}
        </button>
    )
}

//登录组件
export const Login = () => {
    const { setUserData } = useUserData()
    //实现页面跳转
    const navigate = useNavigate()

    // 登录处理函数
    const handleAction = async (_prevState: any, formData: FormData) => {
        //_prevState 可以用来获取之前的状态，但在登录场景中我们不需要它，所以用 _prevState 来表示未使用的参数
        const username = formData.get("username")
        const password = formData.get("password")
        //登录用户
        try {
            //获取响应对象
            const res = await fetch("http://localhost:3000/users") //res 是一个 Response 对象，包含响应信息，但不是实际的数据。
            if(!res.ok){
                throw new Error("网络请求失败")
            }
            //GET 是默认方法，不需要 headers 和 body
            //解析响应数据
            const users = await res.json() //users 是解析后的数据，通常是一个数组或对象，取决于服务器返回的数据结构。
            await delay(2000)
            //检查用户名和密码是否匹配
            const user = users.find((u) => u.username === username)
            if (user) {
                if (user.password === password && user.username !== "admin") {
                    console.log(user)
                    setUserData(user)
                    navigate(`/${user.id}`)
                    message.open({
                        type: "success",
                        content: `登录成功，欢迎回来${user.username}（づ￣3￣）づ╭❤️～`,
                    })

                    return {
                        message: "登录成功",
                        success: true,
                    }
                } else if (user.username === "admin") {
                    navigate("/admin")
                    message.open({
                        type: "success",
                        content: "管理员登录成功(╹ڡ╹ )",
                    })

                    return {
                        message: "管理员登录成功",
                        success: true,
                    }
                } else {
                    message.open({
                        type: "error",
                        content: "密码错误，请稍后重试(￣▽￣)",
                    })
                    return {
                        message: "密码错误",
                        success: false,
                    }
                }
            } else {
                message.open({
                    type: "error",
                    content: "用户不存在，请稍后重试(っ °Д °;)っ",
                })
                return {
                    message: "用户不存在",
                    success: false,
                }
            }
        } catch (error) {
            message.open({
                type: "error",
                content: "登录失败 " + error,
            })
            return {
                message: "登录失败 " + error,
                success: false,
            }
        }
    }

    const [state, submitAction, isPending] = useActionState(handleAction, null)

    return (
        <div className='h-screen w-full flex items-center justify-center'>
            {/* 登录框 */}
            <div className='backgroundStyle flex flex-col gap-7 items-center justify-center h-11/20 w-1/4 min-h-[450px] min-w-[350px]'>
                {/* 标题 */}
                <h2 className='text-2xl font-bold'>用户登录</h2>

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
                        <p>没有账号？去注册</p>
                    </Link>
                    <Link to='/' className='text-gray-400 hover:text-gray-300 transition-colors'>
                        <p>返回首页</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
