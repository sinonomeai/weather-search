import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
            <h1 className="text-[50px]">404 - Page Not Found</h1>
            <Link to='/'>
                <button className='cursor-pointer '>Go back Home</button>
            </Link>
        </div>
    )
}