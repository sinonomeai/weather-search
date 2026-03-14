import { FutureTable } from "./FutureTable"
export const WeatherFuture = () => {
    return (
        <div
            className='backgroundStyle h-110 w-9/10 p-5'>
            <div className='flex flex-col h-full w-full'>
                <p className='titleFont'>未来七天</p>
                <FutureTable />
            </div>
        </div>
    )
}
