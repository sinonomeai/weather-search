import { useUsers } from "../../hooks/useUsers";
import { useEffect } from "react";
import type { User } from "../../types/User";
import { useUserDeleteMutation } from "../../hooks/useUserMutation";
import { message } from "antd";
import { RefreshButton } from "./component/refreshButton";
export const UserManagement = () => {
  const { data: users, refetch, error, isFetching } = useUsers();
  
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (error) {
      console.log(error.message);
      message.error("用户数据加载失败");
    }
  }, [error]);
 
  const { mutate: deleteUser } = useUserDeleteMutation();
  const handleDelete = (userId: string) => {
    deleteUser({ userId });
  };
  return (
    <div className='flex flex-col divide-y divide-[rgba(255,255,255,0.3)]'>
      <div className='flex justify-between items-center pb-[15px]'>
        <div>
          {/* 实现渐变文字 */}
          <span className='text-[32px] font-bold bg-[linear-gradient(to_right,#fff,#b4c0d9)] bg-clip-text text-transparent'>
            用户管理
          </span>
        </div>
        <div>
          <RefreshButton handleRefresh={()=>{refetch()}} />
        </div>
      </div>
      <div className='admin-table mt-[40px]'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>注册时间</th>
              <th>最后登录</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {isFetching && (
              <tr>
                <td colSpan={5}>正在加载用户数据...</td>
              </tr>
            )}
            {!isFetching && users &&
              users.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.lastLoginAt}</td>
                  <td>
                    <button
                      className='buttonStyle !w-[70px] !rounded-[10px]'
                      onClick={() => handleDelete(user.id)}>
                      删除
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
