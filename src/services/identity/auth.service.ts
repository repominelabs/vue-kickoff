import Api from '../../utils/helpers/api'
import config from '../../config'
import { AxiosResponse } from 'axios'
import { IApiResponse, ILogin, IAuth, IRegister, IUser, IRefreshToken } from '../../types'

class AuthService extends Api {
    private static _instance?: AuthService

    private constructor() {
        super(config.API_URL)
    }

    // Fetches singleton object, so only one object is statically preserved in run time
    public static getInstance(): AuthService {
        if (!this._instance) this._instance = new AuthService()

        return this._instance
    }

    public login = async (payload: ILogin) => await this.instance.post<ILogin, AxiosResponse<IApiResponse<IAuth>>, ILogin>('/identity/auth/login', payload)

    public register = async (payload: IRegister) => await this.instance.post<IRegister, AxiosResponse<IApiResponse<IUser>>, IRegister>('/identity/auth/register', payload)

    public refreshToken = async (payload: IRefreshToken) => await this.instance.post<IRefreshToken, AxiosResponse<IApiResponse<IRefreshToken>>, IRefreshToken>('/identity/auth/refresh-token', payload)

    public logout = async () => await this.instance.post('/auth/logout')
}

export default AuthService.getInstance()