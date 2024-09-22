import axios from "./axios";

export const loginRequest = (user) => axios.post(`/Authentication`, user);

// Enviar solicitud de verificación de token con Bearer Token
export const verifyTokenRequest = (token) =>
  axios.get(`/Authentication/VerifyToken`, {
    headers: {
      Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
    },
  });
