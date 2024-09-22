import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoutes({ allowedRoles }) {
  const { user, loading } = useAuth();

  // Mostrar un spinner o mensaje de carga si el estado de autenticación está en proceso
  if (loading) {
    return <div>Loading...</div>; // Puedes personalizar este mensaje de carga
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el rol no está permitido, redirigir a /tasks o /users dependiendo del rol
  if (allowedRoles && !allowedRoles.includes(user.roleName)) {
    return (
      <Navigate to={user.roleName === "Administrator" ? "/users" : "/tasks"} />
    );
  }

  return <Outlet />;
}

export default ProtectedRoutes;
