import axios from 'axios';
import { BASE_URL } from './Baseurl';

const token = localStorage.getItem("myToken");
const axiosinstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authrization": token ? `Bearear ${token}` : ""
    }
});

export default axiosinstance;
