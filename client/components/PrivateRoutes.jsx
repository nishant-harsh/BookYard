import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth";
import LoadingPage from "./loading";

const PrivateRoutes = () => {
  const { isAuthenticated, isPending } = useCurrentUser();

  if (isPending) return <LoadingPage />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
