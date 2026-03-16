import { NavLink, useLocation } from "react-router-dom"
export const SiderBar = () => {
    const location = useLocation()
    return (
        <div className='backgroundStyle flex-1 flex flex-col p-[20px]'>
            <div className='mb-[20px]'>
                <div className='admin-logo'>
                    <p>管理后台</p>
                </div>
            </div>
            <div>
                <ul className='flex flex-col gap-[16px]'>
                    <li>
                        <NavLink to='/Admin/dashboard' className={`admin-nav ${location.pathname==="/admin"?"active":""}`}>
                            数据概览
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Admin/users' className='admin-nav'>
                            用户管理
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Admin/announcements' className='admin-nav'>
                            系统公告
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Admin/data' className='admin-nav'>
                            数据管理
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='admin-nav-back'>
                            返回前台
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
