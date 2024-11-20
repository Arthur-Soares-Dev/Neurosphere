import axios from 'axios';
import {useLoading} from "../contexts/LoadingContext";
// import BASE_URL from './ipLocal'
//
// let url = ''
// if (BASE_URL) {
//   url = BASE_URL;
// } else {
//   url = '10.0.2.2';
// }

// global.testServer


let baseUrl = "https://neurosphere-server.vercel.app/";

if (global.testServer) {
    baseUrl = "https://neurosphere-server-2.vercel.app";
}

// let baseUrl = "http://192.168.0.19:5000/";


const api = axios.create({
  baseURL: `https://neurosphere-server.vercel.app/`,
  // baseURL: `http://192.168.0.19:5000/`,
  // baseURL: baseUrl,
});

export default api;
