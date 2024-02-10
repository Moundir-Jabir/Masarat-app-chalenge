import axios from 'axios';
const API_URL = 'http://jsonplaceholder.typicode.com'

const api = axios.create({
  baseURL: API_URL
});

export default api;
