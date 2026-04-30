import { Outlet } from "react-router-dom";
import { SiderBar } from "../component/admin/SiderBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const AdminPage = () => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(location);

  useEffect(() => {
    //只有当pathname变化才触发
    if (location.pathname !== displayChildren.pathname) {
      setDisplayChildren(location);
    }
  }, [location]);
  return (
    <div className='admin-page w-screen h-screen p-[20px] flex gap-[25px] '>
      <SiderBar />
      <div className=' backgroundStyle flex-5 min-w-[400px] p-[40px] overflow-y-auto'>
        <div
        //只要key变化，组件就会重新挂载
        //没用key的时候，组件不卸载，只渲染内容，不会触发动画
          key={displayChildren.key}
          className='route-transition flex flex-col divide-y divide-[rgba(255,255,255,0.3)]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
