import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NotFoundRedirect() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si estamos cargando (loading), no hacemos nada hasta que se verifique la autenticación
    if (loading) return;

    // Si el usuario no está autenticado, lo redirige a /login
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Si el usuario está autenticado, redirige según su rol
      if (user?.roleName === "Administrator") {
        navigate("/users");
      } else if (
        user?.roleName === "Supervisor" ||
        user?.roleName === "Employee"
      ) {
        navigate("/tasks");
      }
    }
  }, [user, isAuthenticated, loading, navigate]);

  // Mostrar un pequeño mensaje de carga o spinner mientras verificamos el estado de autenticación
  if (loading) {
    return <div>Loading...</div>;
  }

  return null; // No renderiza nada, solo redirige cuando sea necesario
}

export default NotFoundRedirect;
