import { getApi } from "../api/getApi";
import { useQuery } from "@tanstack/react-query";
export const useApi = () => {
    return useQuery({
      queryKey: ["apiStats"],
      queryFn: getApi,
      enabled: false,
      retry: 1,
    });
}