import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../services/auth";

// Crear el contexto
export const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Proveedor de Autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true); // Indicador de carga

  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      const userData = res.data.response;

      // Guardar el token en el localStorage
      localStorage.setItem("jwtToken", userData.jwtToken);

      setUser(res.data.response);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      setErrors([error.response.data.errors]);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("jwtToken");
      if (token == null) {
        setIsAuthenticated(false);
        setLoading(false); // Autenticación completada
        return setUser(null);
      }

      if (token != null) {
        try {
          const res = await verifyTokenRequest(token);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false); // Autenticación completada
            return;
          }

          setIsAuthenticated(true);
          setUser(res.data.response);
          setLoading(false); // Autenticación completada
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false); // Autenticación completada
          localStorage.removeItem("jwtToken");
        }
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singin,
        logout,
        user,
        loading, // loading ahora es parte del contexto
        isAuthenticated,
        errors,
      }}
    >
      {!loading && children}{" "}
      {/* No renderizar hijos hasta que loading sea false */}
    </AuthContext.Provider>
  );
};
