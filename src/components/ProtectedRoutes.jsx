import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
 
  if (localStorage.getItem("token")) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  } 
}; 

