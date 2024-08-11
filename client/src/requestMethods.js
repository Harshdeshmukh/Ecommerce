import axios from "axios";

const BASE_URL="http://localhost:8000/api/";

const Token = localStorage.getItem("persist:root") && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken;
export const publicRequest= axios.create({
    baseURL:BASE_URL,
});
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${Token}` },
  });