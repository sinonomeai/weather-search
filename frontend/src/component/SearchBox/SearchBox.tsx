import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useCityData } from "../../stores/cityData";
import { useWeather } from "../../hooks/useWeather";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../utils/useDebounce";
import { PullBox } from "./PullBox";
export const SearchBox = () => {
  const { setCityData } = useCityData();
  const [cityName, setCityName] = useState("");
  const { t } = useTranslation();
  //解构
  const {
    refetch, // 手动触发请求的方法
    isFetching, // 是否正在请求（包括后台）
  } = useWeather(cityName); // 传入城市名
  //点击搜索
  const handleSearch = async () => {
    if (!cityName.trim()) {
      message.warning("请输入城市名");
      return;
    }
    const result = await refetch();
    if (result.data) {
      setCityData(cityName);
      message.success(`${cityName}天气数据获取成功(/≧▽≦)/`);
    } else if (result.error) {
      message.error(result.error.message);
    }
  };
  //点击搜索框展开联想搜索逻辑
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!isSearching) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as HTMLElement)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSearching]);
  //防抖处理输入变化用户停止输入 200ms 后更新城市名称
  const debounce = useDebounce({
    fn: (e: string) => {
      setCityName(e);
    },
    delay: 200,
  });
  const handleChange = (e: string) => {
    debounce(e);
  };
  return (
    <div
      className='backgroundStyle h-30 w-19/20 flex flex-wrap justify-center items-center  max-md:flex-col max-md:h-36
    will-change-transform'>
      <div className='md:flex-1 flex flex-col justify-center pl-10 w-full max-md:pl-5'>
        <p className='text-[20px] tracking-[0.1em]'>{t("searchBox-title")}</p>
        <p className='text-[#b4c0d9] text-[14px] '>{t("searchBox-tip")}</p>
      </div>
      <div className='md:flex-3 flex gap-3 pr-5 pt-4 w-full max-md:pl-5'>
        <div className='relative flex-1'>
          <input
            ref={searchRef}
            type='text'
            placeholder={t("searchBox-placeholder")}
            className='searchInput outline-none w-full'
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            onFocus={() => setIsSearching(true)}
          />
          {isSearching && (
            <div className='absolute right-0 left-0 mt-[10px]'>
              <PullBox cityName={cityName}></PullBox>
            </div>
          )}
        </div>

        <button className='buttonStyle' onClick={handleSearch} disabled={isFetching}>
          {isFetching ? <LoadingOutlined style={{ fontSize: 24 }} /> : t("searchBox-search")}
        </button>
      </div>
    </div>
  );
};
