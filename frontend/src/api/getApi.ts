const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "p35khw3dwx.re.qweatherapi.com";
export const getApi = async () => {
  try {
    const res = await fetch(`https://${BASE_URL}/metrics/v1/stats?key=${API_KEY}`);
    if (!res.ok) throw new Error("网络请求失败");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "网络错误");
  }
};
