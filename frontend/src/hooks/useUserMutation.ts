import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import type { DeleteUser } from "../types/User";
import { deleteUser } from "../api/deleteUser";
import { useUsers } from "../hooks/useUsers";
export const useUserDeleteMutation = () => {
  const { refetch } = useUsers();
  return useMutation({
    mutationFn: async ({ userId }: DeleteUser) => {
      return deleteUser(userId);
    },
    //data是返回的结果，variables是传入的参数
    onSuccess: (data, _variables) => {
      message.success(data.message);
      refetch();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
