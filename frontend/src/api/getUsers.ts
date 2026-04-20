import type { User } from "../types/User";

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("网络请求失败");
    const users = await res.json();
    const usersTure = users.filter((u: User) => u.username !== "admin");
    const backUsers = usersTure.map((u: User) => ({
      id: u.id,
      username: u.username,
      role: u.role,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
      favourCities: u.favourCities,
    }));
    return backUsers;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "网络错误");
  }
};
