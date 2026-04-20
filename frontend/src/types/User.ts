import type { CityInfo } from "./City";
export interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
  lastLoginAt: string;
  favourCities: CityInfo[];
}
export interface DeleteUser {
  userId: string;
}