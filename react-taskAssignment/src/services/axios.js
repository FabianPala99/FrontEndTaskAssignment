import axios from "axios";

const instance = axios.create({
  baseURL: "https://backendtaskassignment.azurewebsites.net",
});

export default instance;
