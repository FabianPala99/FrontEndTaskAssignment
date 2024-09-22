import axios from "./axios";

export const getUsersRequest = (token) =>
  axios.get("/UserAdministration/Users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getSupervisoryUsersRequest = (token) =>
  axios.get("/UserAdministration/SupervisoryUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getEmployedUsersRequest = (token) =>
  axios.get("/UserAdministration/EmployedUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserByIdRequest = (token, id) =>
  axios.get(`/UserAdministration/UserById?idUser=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createUserRequest = (token, user) =>
  axios.post("/UserAdministration/User", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateUserRequest = (token, user) =>
  axios.patch("/UserAdministration/User", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteUserRequest = (token, id) =>
  axios.delete(`/UserAdministration/User?idUser=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
