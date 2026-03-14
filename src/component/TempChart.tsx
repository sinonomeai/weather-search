import { useWeatherData } from "../store/weatherData"
import { IconFont } from "./IconFont"
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js"
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
)
export const TempChart = () => {
    const { weatherData } = useWeatherData()
    if (!weatherData) {
        return (
            <div className='w-full h-120'>
                <div className='w-full h-full p-3 text-center flex items-center justify-center'>
                    <p className='text-gray-400 text-[30px]'>暂无数据,请先搜索城市</p>
                </div>
            </div>
        )
    }
    const dayData = weatherData?.forecast24h
    const labels = dayData.map((item) => `${new Date(item.fxTime).getHours()}:00`)
    const windSpeed = dayData.map((item) => Number(item.windSpeed))
    const temps = dayData.map((item) => Number(item.temp))
    const data = {
        labels: labels,
        datasets: [
            {
                label: "温度 (°C)",
                data: temps,
                fill: false,
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.8)",
                tension: 0.2, // 曲线平滑度
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: "风速 (m/s)",
                data: windSpeed,
                borderColor: "rgb(255, 159, 64)",
                backgroundColor: "rgba(255, 159, 64, 0.8)",
                tension: 0.2,
                yAxisID: "y1", // 使用右侧Y轴
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    }

   const options = {
       responsive: true, // 自适应容器大小
       maintainAspectRatio: false, // 宽高比
       plugins: {
           tooltip: {
               enabled: true,
               backgroundColor: "rgba(0, 0, 0, 0.5)",
               titleColor: "#fff",
               bodyColor: "#fff",
           },
           legend: {
               labels: { color: "#b4c0d9" }, //上方标题颜色
           },
       },
       scales: {
           y: {
               type: "linear",
               display: true,
               position: "left",
               grid: { color: "rgba(255,255,255,0.1)" },
               ticks: {
                   //刻度
                   callback: (value) => `${value}°C`,
                   color: "rgba(255,255,255,0.8)",
               },
               title: {
                   //轴标题
                   display: true,
                   text: "温度 (°C)",
                   color: "rgba(255,255,255,0.8)",
               },
           },
           y1: {
               type: "linear",
               display: true,
               position: "right",
               grid: { drawOnChartArea: false }, // 不绘制网格线
               ticks: {
                   callback: (value) => `${value}m/s`,
                   color: "rgba(255,255,255,0.8)",
               },
               title: {
                   display: true,
                   text: "风速 (m/s)",
                   color: "rgba(255,255,255,0.8)",
               },
           },
           x: {
               // X轴（时间）
               grid: { display: true },
               ticks: {
                   color: "rgba(255, 255, 255, 0.8)",
                   font: {
                       size: 16, 
                       lineHeight: 1.5, 
                   },
                   maxTicksLimit: 24,
                   autoSkip: false,
               },
           },
       },
   }
    return (
        <div className='w-full h-120 overflow-x-auto rounded-xl backdrop-blur-sm'>
            <div className='w-[1200px] h-full p-3'>
                <Line data={data} options={options} />
                <IconFont/>
            </div>
        </div>
    )
}
