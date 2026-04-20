import { useMutation } from "@tanstack/react-query"
import { deleteWeather, addWeather } from "../api/changeWeather"
import { message } from "antd"
import { useUserData } from "../stores/userData"
import type {  DeleteCity, AddCity } from "../types/City"
export const useDeleteMutation = () => {
    const { userData, setUserData } = useUserData()
    return useMutation({
        mutationFn: async ({ newCities, userId }: DeleteCity) => {
            return deleteWeather({ newCities, userId })
        },
        //data是返回的结果，variables是传入的参数
        onSuccess: (data, variables) => {
            message.success(data.message)
            if (userData) {
                setUserData({
                    ...userData,
                    favourCities: variables.newCities,
                })
            }
        },
        onError: (error) => {
            message.error(error.message)
        },
    })
}
export   const useAddMutation = () => {
    const { userData, setUserData } = useUserData()
    return useMutation({
        mutationFn: async ({ cityInfo, userId, cities }: AddCity) => {
            return addWeather({ cityInfo, userId, cities })
        },
        onSuccess: (data) => {
            message.success(data.message)
            if(userData){
                setUserData(data.user)
            }
        },
        onError: (error) => {
            message.error(error.message)
        },
    })
}