import { message } from "antd"

export const getUser = async (userName: string, password: string) => {
    try {
        const res = await fetch("http://localhost:3000/users")
        if (!res.ok) throw new Error("网络请求失败")

        const users = await res.json()
        const user = users.find((u: any) => u.username === userName)

        if (!user) {
            return {
                message: "用户不存在",
                success: false,
            }
        }
        if (user.password !== password) {
            return {
                message: "登录失败，密码错误",
                success: false,
            }
        }
        const isAdmin = user.username === "admin"
        return {
            message: isAdmin
                ? "登录成功，欢迎回来管理员（づ￣3￣）づ╭❤️～"
                : `登录成功，欢迎回来${user.username}（づ￣3￣）づ╭❤️～`,
            success: true,
            user: {
                id: user.id,
                role: user.role,
                username: user.username,
                favourCities: user.favourCities,
            },
        }
    } catch (error) {
        return {
            message: `登录失败: ${error instanceof Error ? error.message : "网络错误"}`,
            success: false,
        }
    }
}
export const postUser = async (userName: string, password: string, confirmPassword: string) => {
    try {
        if (userName.trim() === "") {
            return {
                message: "用户名不能为空￣へ￣",
                success: false,
            }
        }
        if (password.trim() === "") {
            return {
                message: "密码不能为空￣へ￣",
                success: false,
            }
        }
        const res1 = await fetch("http://localhost:3000/users")
        if (!res1.ok) throw new Error("网络请求失败")
        const users = await res1.json()
        if (users.find((u: any) => u.username === userName)) {
            return {
                success: false,
                message: "用户名已存在(っ °Д °;)っ",
            }
        }
        if (password !== confirmPassword) {
            return {
                success: false,
                message: "两次输入密码不一致，请重新输入♪(´▽｀)",
            }
        }
        const newUser = {
            id: Date.now().toString(), //使用时间戳作为简单的唯一ID
            username: userName,
            password: password,
            role: "user",
            createdAt: new Date().toISOString(), //记录创建时间(以ISO格式存储)
            favourCities: [],
        }
        const res2 = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
         if (!res2.ok) {
             throw new Error("网络请求失败")
         }
         return{
            success:true,
            message:"注册成功"
         }
    } catch (error) {
        return {
            success: false,
            message: `注册失败: ${error instanceof Error ? error.message : "网络错误"}`,
        }
    }
}
