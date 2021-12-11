import Api from '../../utils/helpers/api'
import config from '../../config'
import { AxiosResponse } from 'axios'
import { IApiResponse, IRole, ISearchRolesRequest, ISearchRolesResponse } from '../../types'

class RoleService extends Api {
    private static _instance?: RoleService

    private constructor() {
        super(config.API_URL)
    }

    // Fetches singleton object, so only one object is statically preserved in run time
    public static getInstance(): RoleService {
        if (!this._instance) this._instance = new RoleService()

        return this._instance
    }

    public searchRolesAsync = async (payload: ISearchRolesRequest) => await this.instance.post<ISearchRolesResponse, AxiosResponse<IApiResponse<ISearchRolesResponse>>, ISearchRolesRequest>('identity/role/search-roles', payload)

    public saveRoleAsync = async (payload: IRole) => await this.instance.post<IRole, AxiosResponse<IApiResponse<IRole>>, IRole>('identity/role/save-role', payload)

    public updateRoleAsync = async (payload: IRole) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IRole>('identity/role/update', payload)

    public deleteRoleAsync = async (payload: IRole) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IRole>('identity/role/delete-role', payload)
}

export default RoleService.getInstance()




