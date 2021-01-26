import axios from 'axios';
const api = axios.create({
  baseURL: process.env.API_URL, // or process.env.BASE_URL if not using CRA
});
export default api;
