import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { IApiResponse, IRefreshToken } from '../../types'
import StorageService from '../../services/storage.service'
import router from '../../router'
import store from '../../store'

const LOCAL_STORAGE_ACCESS_TOKEN = 'ACCESS_TOKEN'
const LOCAL_STORAGE_REFRESH_TOKEN = 'REFRESH_TOKEN'

abstract class Api {
    protected readonly instance: AxiosInstance

    public constructor(baseURL: string) {
        // Create axios instance
        this.instance = axios.create({
            baseURL,
        })

        // Activate request interceptor
        this._initReqInterceptor()

        // Activate response interceptor
        this._initRespInterceptor()
    }

    // Request interceptor
    private _initReqInterceptor = () => {
        this.instance.interceptors.request.use(
            this._handleReq,
            this._handleReqError,
        )
    }

    // Response interceptor
    private _initRespInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResp,
            this._handleRespError,
        )
    }

    // Calling in the interceptor > request.use
    private _handleReq = (config: AxiosRequestConfig): AxiosRequestConfig => {
        config!.headers!['Authorization'] = 'Bearer ' + StorageService.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
        return config
    }

    // Calling in the interceptor > request.use
    protected _handleReqError = (error: any) => Promise.reject(error)

    // Calling in the interceptor > response.use
    private _handleResp = (response: AxiosResponse) => Promise.resolve(response)

    // Calling in the interceptor > response.use
    // Debug error and starts the refresh token process if necessary
    protected _handleRespError = (error: any) => {
        const config = error.config;

        if (config.url !== "Identity/Authentication/Login" && error.response) {
            if (error.response.status === 401 && !config._retry) {
                config._retry = true;
                return new Promise((resolve, reject) => {
                    const refreshToken = StorageService.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
                    const accessToken = StorageService.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
                    this.instance.post<IRefreshToken, AxiosResponse<IApiResponse<IRefreshToken>>, IRefreshToken>('Identity/Authentication/RefreshAccessToken', { refreshToken, accessToken })
                        .then((response) => {
                            if (response.data.status) {
                                // 1) Store Auth to State
                                store.commit('auth/refreshToken', response.data.response)

                                // 2) Change Content-Type header
                                config.headers['Authorization'] = `Bearer ${StorageService.getItem(LOCAL_STORAGE_ACCESS_TOKEN)}`

                                // 3) Return request object with axios
                                this.instance(config).then(_response => {
                                    resolve(_response)
                                }).catch((err) => {
                                    reject(err)
                                })
                            } else {
                                store.dispatch('auth/logout').then(() => {
                                    router.push('/login')
                                })
                            }
                        })
                        .catch(_error => {
                            store.dispatch('auth/logout').then(() => {
                                router.push('/login')
                            })

                            reject(_error)
                        })
                })
            } else if (error.response.status === 401) {
                store.dispatch('auth/logout').then(() => {
                    router.push('/login')
                })

                return Promise.reject(error)
            } else {
                return Promise.reject(error)
            }
        }
    }
}

export default Api