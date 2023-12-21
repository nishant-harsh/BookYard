import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth";
import LoadingPage from "./loading";

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {
  const { isAdmin, isPending } = useCurrentUser();
  if (isPending) return <LoadingPage />;
  return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedRoutes;
