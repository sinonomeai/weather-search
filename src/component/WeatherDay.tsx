import { TempChart } from "./TempChart"
export const WeatherDay = () => {
    return (
        <div className='backgroundStyle h-150 w-9/10 p-5'>
            <div>
                <p className="titleFont">
                    未来24H
                </p>
                <TempChart/>
            </div>
        </div>
    )
}
