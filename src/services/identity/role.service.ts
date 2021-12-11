import Api from '../../utils/helpers/api'
import config from '../../config'
import { AxiosResponse } from 'axios'
import { IApiResponse, IRole, IRoleSearchReq, IRoleSearchResp } from '../../types'

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

    public search = async (payload: IRoleSearchReq) => await this.instance.post<IRoleSearchResp, AxiosResponse<IApiResponse<IRoleSearchResp>>, IRoleSearchReq>('role/search', payload)

    public save = async (payload: IRole) => await this.instance.post<IRole, AxiosResponse<IApiResponse<IRole>>, IRole>('role/save', payload)

    public update = async (payload: IRole) => await this.instance.put<null, AxiosResponse<IApiResponse<null>>, IRole>('role/update', payload)

    public delete = async (id: number) => await this.instance.delete<null, AxiosResponse<IApiResponse<null>>, IRole>(`role/delete?id=${id.toString()}`)
}

export default RoleService.getInstance()




