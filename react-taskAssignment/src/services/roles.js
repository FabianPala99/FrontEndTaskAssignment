import axios from "./axios";

export const getRolesRequest = (token) =>
  axios.get("/RolAdministration/Roles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getRolByIdRequest = (token, id) =>
  axios.get(`/RolAdministration/RolById?idUser==${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
