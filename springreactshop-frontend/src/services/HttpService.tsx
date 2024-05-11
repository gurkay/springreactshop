import axios, { AxiosInstance } from 'axios';

const httpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const baseURL = 'http://localhost:8080/api/v1/';

const _axios: AxiosInstance = axios.create({
    baseURL,
});

const configure = () => {
    _axios.interceptors.request.use( async (config) => {
        return config;
    });
}

const getAxiosClient = (): AxiosInstance => _axios;

const HttpService = {
    httpMethods,
    configure,
    getAxiosClient
}

export default HttpService;