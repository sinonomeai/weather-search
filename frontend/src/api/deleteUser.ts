export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("网络请求失败");
    return {
        message: "用户删除成功"
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "网络错误");
  }
};