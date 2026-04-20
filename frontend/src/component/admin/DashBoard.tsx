import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useUsers } from "../../hooks/useUsers";
import { message } from "antd";
import { RefreshButton } from "./component/refreshButton";
export const Dashboard = () => {
  const {
    data: apiData,
    isFetching: isApiFetching,
    error: apiError,
    refetch: refetchApi,
  } = useApi();
  const {
    data: userData,
    isFetching: isUsersFetching,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers();

  useEffect(() => {
    if (usersError) {
      console.log(usersError?.message);
      message.error("用户数据加载失败");
    }
    if (apiError) {
      console.log(apiError?.message);
      message.error("API调用数据加载失败");
    }
  }, [usersError, apiError]);

  return (
    <div className='flex flex-col divide-y divide-[rgba(255,255,255,0.3)]'>
      <div className='flex justify-between items-center pb-[15px]'>
        <div>
          {/* 实现渐变文字 */}
          <span className='text-[32px] font-bold bg-[linear-gradient(to_right,#fff,#b4c0d9)] bg-clip-text text-transparent'>
            系统运行监控
          </span>
        </div>
        <div>
          <RefreshButton
            handleRefresh={() => {
              refetchUsers();
              refetchApi();
            }}
          />
        </div>
      </div>
      <div className='flex flex-col gap-[40px]'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 pt-[40px]'>
          <div className='admin-grass-card h-[150px] '>
            <h1>⚡ 总 API 调用</h1>
            <p>{isApiFetching ? "加载中..." : (apiData?.totalCalls ?? 0)}</p>
          </div>
          <div className='admin-grass-card h-[150px] '>
            <h1>👥 注册用户数</h1>
            <p>{isUsersFetching ? "加载中..." : (userData?.length ?? 0)}</p>
          </div>
          <div className='admin-grass-card h-[150px]'>
            <h1>➕ 今日新注册用户</h1>
            <p>{isUsersFetching ? "加载中..." : (userData?.length ?? 0)}</p>
          </div>
          <div className='admin-grass-card h-[150px] '>
            <h1>👤 今日API调用</h1>
            <p>{isApiFetching ? "加载中..." : (apiData?.success.hours ?? 0)}</p>
          </div>
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))]  gap-4'>
          <div className='admin-grass-card h-[500px]'>
            <h1>📈 今日用户王</h1>
          </div>
          <div className='admin-grass-card h-[500px] '>
            <h1>🏙️ 热门查询城市</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
