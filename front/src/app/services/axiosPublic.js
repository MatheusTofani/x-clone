
import axios from "axios";

const apiPublic = axios.create({
  baseURL: "https://back-x-project.fly.dev/api/",
});

export default apiPublic;
