import Api from '../utils/helpers/api'
import config from '../config'
import { AxiosResponse } from 'axios'
import { IApiResponse, IUser, IUserSearchReq, IUserSearchResp, IUserRoleReq } from '../types'

class UserService extends Api {
    private static _instance?: UserService

    private constructor() {
        super(config.API_URL)
    }

    // Fetches singleton object, so only one object is statically preserved in run time
    public static getInstance(): UserService {
        if (!this._instance) this._instance = new UserService()

        return this._instance
    }

    public searchUsersAsync = async (payload: IUserSearchReq) => await this.instance.post<IUserSearchResp, AxiosResponse<IApiResponse<IUserSearchResp>>, IUserSearchReq>('user/search-users', payload)

    public saveUserAsync = async (payload: IUser) => await this.instance.post<IUser, AxiosResponse<IApiResponse<IUser>>, IUser>('user/save-user', payload)

    public saveMultipleUserAsync = async (payload: IUser[]) => await this.instance.post<IUser[], AxiosResponse<IApiResponse<IUser[]>>, IUser[]>('user/save-multiple-user', payload)

    public updateUserAsync = async (payload: IUser) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IUser>('user/update-user', payload)

    public deleteUserAsync = async (payload: IUser) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IUser>('user/delete-user', payload)

    public addToRoleAsync = async (payload: IUserRoleReq) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IUserRoleReq>('user/add-to-role', payload)

    public removeFromRoleAsync = async (payload: IUserRoleReq) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IUserRoleReq>('user/remove-from-role', payload)
}

export default UserService.getInstance()