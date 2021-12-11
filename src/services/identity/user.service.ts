import Api from '../../utils/helpers/api'
import config from '../../config'
import { AxiosResponse } from 'axios'
import { IApiResponse, IUser, ISearchUsersRequest, ISearchUsersResponse, IAddToRoleRequest, IRemoveFromRoleRequest } from '../../types'

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

    public searchUsersAsync = async (payload: ISearchUsersRequest) => await this.instance.post<ISearchUsersResponse, AxiosResponse<IApiResponse<ISearchUsersResponse>>, ISearchUsersRequest>('identity/user/search-users', payload)

    public saveUserAsync = async (payload: IUser) => await this.instance.post<IUser, AxiosResponse<IApiResponse<IUser>>, IUser>('identity/user/save-user', payload)

    public saveMultipleUserAsync = async (payload: IUser[]) => await this.instance.post<IUser[], AxiosResponse<IApiResponse<IUser[]>>, IUser[]>('identity/user/save-multiple-user', payload)

    public updateUserAsync = async (payload: IUser) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IUser>('identity/user/update-user', payload)

    public deleteUserAsync = async (payload: IUser) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IUser>('identity/user/delete-user', payload)

    public addToRoleAsync = async (payload: IAddToRoleRequest) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IAddToRoleRequest>('identity/user/add-to-role', payload)

    public removeFromRoleAsync = async (payload: IRemoveFromRoleRequest) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IRemoveFromRoleRequest>('identity/user/remove-from-role', payload)
}

export default UserService.getInstance()