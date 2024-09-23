import axios from 'axios';
import { getEnvVariables } from '../hooks';

const { VITE_URL_API } = getEnvVariables();

const anunciosApi = axios.create({
    baseURL: VITE_URL_API,
});

// configurar interceptores
anunciosApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token' : localStorage.getItem('token'),
    }

    return config;
});

export default anunciosApi;