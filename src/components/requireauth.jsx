import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        localStorage.getItem("isManagerLoggedIn") === "true" || localStorage.getItem("isAdminLoggedIn") === "true" || localStorage.getItem("isWorkerLoggedIn") === "true"
            ? <Outlet />
                : <Navigate to="/" state={{ from: location }} replace />
    );
} 

export default RequireAuth;