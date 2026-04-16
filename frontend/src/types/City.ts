export interface CityInfo {
    id: string
    name: string
    country: string
    addedAt: string
}
export interface DeleteCity {
    newCities: CityInfo[]
    userId: string
}
export interface AddCity {
    cityInfo: CityInfo
    userId: string
    cities: CityInfo[]
}
