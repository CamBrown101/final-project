import axios from 'axios';
const API_URL = process.env.API_URL;
const api = axios.create({
  baseURL: API_URL, // or process.env.BASE_URL if not using CRA
});
export default api;
