import { createContext, useState, useContext } from "react";
import { getRolesRequest, getRolByIdRequest } from "../services/roles";

// Crear el contexto
export const RolContext = createContext();

// Hook para usar el contexto
export const useRoles = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useRoles must be used within an AuthProvider");
  }
  return context;
};

// Proveedor de Autenticación
export const RolProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem("jwtToken");

  const getRoles = async () => {
    try {
      const res = await getRolesRequest(token);
      setRoles(res.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const getRolById = async (id) => {
    const res = await getRolByIdRequest(token, id);
  };

  return (
    <RolContext.Provider
      value={{
        roles,
        getRoles,
        getRolById,
      }}
    >
      {children}
    </RolContext.Provider>
  );
};
