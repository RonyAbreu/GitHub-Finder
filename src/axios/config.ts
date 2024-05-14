import axios from "axios";

const apiFetch = axios.create({
  baseURL: "https://api.github.com/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiFetch;
