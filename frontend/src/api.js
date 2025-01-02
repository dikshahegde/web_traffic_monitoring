import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchTrafficData = () => API.get('/traffic');
export const addTrafficData = (data) => API.post('/traffic', data);
