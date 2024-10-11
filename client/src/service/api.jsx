import axios from 'axios';
import BASE_URL from './ipLocal'

let url = ''
if (BASE_URL) {
  url = BASE_URL;
} else {
  url = '10.0.2.2';
}

const api = axios.create({
  baseURL: `http://${url}:5000/`,
});

export default api;
