import { getUser } from "../api/User"
import { useQuery } from "@tanstack/react-query"
export const useUser = (userName: string,password:any) => {
    return useQuery({
        queryKey: ["user", userName],
        queryFn: () => getUser(userName,password),
        enabled: false,
    })
}
