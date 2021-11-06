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

    public search = async (payload: IUserSearchReq) => await this.instance.post<IUserSearchResp, AxiosResponse<IApiResponse<IUserSearchResp>>, IUserSearchReq>('user/search', payload)

    public save = async (payload: IUser) => await this.instance.post<IUser, AxiosResponse<IApiResponse<IUser>>, IUser>('user/save', payload)

    public saveMultiple = async (payload: IUser[]) => await this.instance.post<IUser[], AxiosResponse<IApiResponse<IUser[]>>, IUser[]>('user/saveMultiple', payload)

    public update = async (payload: IUser) => await this.instance.put<null, AxiosResponse<IApiResponse<null>>, IUser>('user/update', payload)

    public delete = async (id: number) => await this.instance.delete<null, AxiosResponse<IApiResponse<null>>, IUser>(`user/delete?id=${id.toString()}`)

    public addUserRole = async (payload: IUserRoleReq) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IUserRoleReq>('user/addUserRole', payload)

    public deleteUserRole = async (payload: IUserRoleReq) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IUserRoleReq>('user/deleteUserRole', payload)
}

export default UserService.getInstance()




