interface CityInfo {
    id: string
    name: string
    country: string
    addedAt: string
}
interface DeleteCity{
    newCities: CityInfo[],
    userId: string
}
interface AddCity{
    cityInfo: CityInfo,
    userId: string,
    cities:CityInfo[]
}
export const deleteWeather = async({ newCities, userId }: DeleteCity) => {
    try {
            const res = await fetch(`http://localhost:3000/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favourCities: [...newCities],
                }),
            })
            if(!res.ok){
                throw new Error("删除失败")
            }
            return{
                message:"删除成功",
            }
    } catch(error) {
        throw new Error(error instanceof Error ? error.message : "删除失败")
    }
}
export const addWeather = async({ cityInfo, userId,cities }: AddCity) => {
    try {
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                favourCities: [...cities,cityInfo],
            }),
        })
        const updatedUser = await res.json()
         if (!res.ok) {
             throw new Error("添加失败")
         }
        return{
            message:"添加成功",
            user: updatedUser
        }
    } catch(error){
        return {
            message:error instanceof Error ? error.message : "添加失败",
        }
    }
}

