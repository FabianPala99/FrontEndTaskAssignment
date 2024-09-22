import axios from "./axios";

export const getTasksRequest = (token) =>
  axios.get("/TaskAdministration/Tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTasksBySupervisoryRequest = (token, id) =>
  axios.get(`/TaskAdministration/TasksBySupervisory?idUser=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTasksByEmployedRequest = (token, id) =>
  axios.get(`/TaskAdministration/TasksByEmployed?idUser=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTaskByIdRequest = (token, id) =>
  axios.get(`/TaskAdministration/TaskById?idTask=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createTaskRequest = (token, task) =>
  axios.post("/TaskAdministration/Task", task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateTaskRequest = (token, task) =>
  axios.patch("/TaskAdministration/Task", task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteTaskRequest = (token, id) =>
  axios.delete(`/TaskAdministration/Task?idTask=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
