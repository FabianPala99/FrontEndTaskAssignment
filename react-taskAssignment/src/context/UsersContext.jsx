import { createContext, useState, useContext } from "react";
import {
  getUsersRequest,
  getUserByIdRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
  getSupervisoryUsersRequest,
  getEmployedUsersRequest,
} from "../services/users";

// Crear el contexto
export const UserContext = createContext();

// Hook para usar el contexto
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within an AuthProvider");
  }
  return context;
};

// Proveedor de Autenticación
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [supervisoryUsers, setSupervisoryUsers] = useState([]);
  const [employedUsers, setEmployedUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const token = localStorage.getItem("jwtToken");

  const getUsers = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token not available");
      return;
    }

    // Espera de 500 ms antes de realizar la solicitud
    setTimeout(async () => {
      try {
        const res = await getUsersRequest(token);
        setUsers(res.data.response);
      } catch (error) {
        setErrors([error.response.data.errors]);
      }
    }, 500); // 500 ms de espera
  };

  const getSupervisoryUsers = async () => {
    try {
      const res = await getSupervisoryUsersRequest(token);
      setSupervisoryUsers(res.data.response);
    } catch (error) {
      setSupervisoryUsers([]);
    }
  };

  const getEmployedUsers = async () => {
    try {
      const res = await getEmployedUsersRequest(token);
      setEmployedUsers(res.data.response);
    } catch (error) {
      setEmployedUsers([]);
    }
  };

  const getByIdUser = async (id) => {
    try {
      const res = await getUserByIdRequest(token, id);
      console.log(res.data.response.firstName);
      return res.data.response.firstName;
    } catch (error) {
      return error.response.data;
    }
  };

  const createUser = async (user) => {
    try {
      const res = await createUserRequest(token, user);
      setErrors([]);
      return res.data;
    } catch (error) {
      setErrors([error.response.data.errors]);
      return error.response.data;
    }
  };

  const updateUser = async (user) => {
    try {
      const res = await updateUserRequest(token, user);
      setErrors([]);
      return res.data;
    } catch (error) {
      setErrors([error.response.data.errors]);
      return error.response.data;
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(token, id);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        supervisoryUsers,
        employedUsers,
        errors,
        getUsers,
        getSupervisoryUsers,
        getEmployedUsers,
        getByIdUser,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
