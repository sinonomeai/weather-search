export const RefreshButton = ({handleRefresh}: {handleRefresh: () => void}) => {
  return (
    
      <button className='buttonStyle !rounded-[10px]' onClick={handleRefresh}>刷新数据</button>
    
  );
};