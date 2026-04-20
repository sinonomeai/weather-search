export const DataManagement = () => {
    return (
      <div className='flex flex-col divide-y divide-[rgba(255,255,255,0.3)]'>
        <div className='flex justify-between items-center pb-[15px]'>
          <div>
            {/* 实现渐变文字 */}
            <span className='text-[32px] font-bold bg-[linear-gradient(to_right,#fff,#b4c0d9)] bg-clip-text text-transparent'>
              数据文件管理
            </span>
          </div>
          <div>
            <button className='buttonStyle !rounded-[10px]'>刷新列表</button>
          </div>
        </div>
        <div className='flex flex-col gap-[40px]'></div>
      </div>
    );
}
