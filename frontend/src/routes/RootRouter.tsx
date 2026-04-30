import { useUserData } from "../stores/userData";
import { Home } from "../pages/Home";
import { Navigate } from "react-router-dom";
export const RootRouter = () => {
  const { userData } = useUserData();
  if (!userData) {
    return <Home />;
  } else {
    if (userData.role === "admin") {
      return <Navigate to='/admin' replace />;
    }
    if (userData.role === "user") {
      return <Navigate to={`/${userData.id}`} replace />;
    }
  }
};
