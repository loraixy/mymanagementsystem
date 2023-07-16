import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

interface Result {
    code: number;
    message: string
}

interface ResultData<T = any> extends Result {
    data: T;
}

/**
 * Http request
 * @author ldz
 * @param option
 * @example 
 * const http = new Http({baseURL: 'http://localhost'})
 * http.get('/test/', {id, str})
 */
class Http {
    instance: AxiosInstance
    config: AxiosRequestConfig
    constructor(option: AxiosRequestConfig) {
        this.config = option
        this.instance = axios.create(this.config)
    }

    interceptors() {
        this.instance.interceptors.request.use(function (config) {
            const token = 'Bearer ' + localStorage.getItem('ms_token');
            token && (config.headers.Authorization = token);

            return config
        }, function (error) {
            return Promise.reject(error)
        })

        this.instance.interceptors.response.use(function (response) {
            return response
        }, function (error) {
            return Promise.reject(error)
        })
    }

    request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
        return this.instance.request(config)
    }

    get<T>(url: string, params?: object): Promise<AxiosResponse<ResultData<T>>> {
        return this.instance.get(url, {params});
    }
    post<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.instance.post(url, params);
    }
}

const http = new Http({
    baseURL: '/api',
})

export default http