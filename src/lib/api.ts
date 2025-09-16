// src/lib/api.ts
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api',
});

// Interceptor que injeta o token em toda requisição
api.interceptors.request.use(async(config) => {
  const token =await Cookies.get("token");
  console.log("token api ==> ", token);

    config.headers.Authorization = `Bearer ${token}`;

  return config;
});


export default api;
