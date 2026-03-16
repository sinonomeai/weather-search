import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/User"
export const useUser = (userName:string)=>{
    return useQuery({
            queryKey: ["User", userName],
            queryFn: () => getUser(userName),
            enabled:false
        })
}