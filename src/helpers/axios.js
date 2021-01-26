import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);
const api = axios.create({
  baseURL: API_URL, // or process.env.BASE_URL if not using CRA
});
export default api;
