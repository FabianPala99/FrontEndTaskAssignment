import { createContext, useState, useContext } from "react";
import {
  getTasksRequest,
  getTaskByIdRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  getTasksBySupervisoryRequest,
  getTasksByEmployedRequest,
} from "../services/tasks";

// Crear el contexto
export const TaskContext = createContext();

// Hook para usar el contexto
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within an AuthProvider");
  }
  return context;
};

// Proveedor de Autenticación
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);
  const token = localStorage.getItem("jwtToken");

  const getTasks = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token not available");
      return;
    }

    // Espera de 500 ms antes de realizar la solicitud
    setTimeout(async () => {
      try {
        const res = await getTasksRequest(token);
        setTasks(res.data.response);
      } catch (error) {
        setErrors([error.response.data.errors]);
      }
    }, 500); // 500 ms de espera
  };

  const getTasksBySupervisory = async (id) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token not available");
      return;
    }

    // Espera de 500 ms antes de realizar la solicitud
    setTimeout(async () => {
      try {
        const res = await getTasksBySupervisoryRequest(token, id);
        setTasks(res.data.response);
        setErrors([]);
      } catch (error) {
        setErrors([error.response.data.errors]);
      }
    }, 500); // 500 ms de espera
  };

  const getTasksByEmployed = async (id) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token not available");
      return;
    }

    // Espera de 500 ms antes de realizar la solicitud
    setTimeout(async () => {
      try {
        const res = await getTasksByEmployedRequest(token, id);
        setTasks(res.data.response);
        setErrors([]);
      } catch (error) {
        setErrors([error.response.data.errors]);
      }
    }, 500); // 500 ms de espera
  };

  const getByIdTask = async (id) => {
    const res = await getTaskByIdRequest(token, id);
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(token, task);
      setErrors([]);
      return res.data;
    } catch (error) {
      setErrors([error.response.data.errors]);
      return error.response.data;
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await updateTaskRequest(token, task);
      setErrors([]);
      return res.data;
    } catch (error) {
      setErrors([error.response.data.errors]);
      return error.response.data;
    }
  };

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(token, id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        errors,
        getTasksByEmployed,
        getTasksBySupervisory,
        getTasks,
        getByIdTask,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
