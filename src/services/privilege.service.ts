import Api from '../utils/helpers/api'
import config from '../config'
import { AxiosResponse } from 'axios'
import { IApiResponse, IPrivilege, IPrivilegeSearchReq, IPrivilegeSearchResp } from '../types'

class PrivilegeService extends Api {
    private static _instance?: PrivilegeService

    private constructor() {
        super(config.API_URL)
    }

    // Fetches singleton object, so only one object is statically preserved in run time
    public static getInstance(): PrivilegeService {
        if (!this._instance) this._instance = new PrivilegeService()

        return this._instance
    }

    public search = async (payload: IPrivilegeSearchReq) => await this.instance.post<IPrivilegeSearchResp, AxiosResponse<IApiResponse<IPrivilegeSearchResp>>, IPrivilegeSearchReq>('privilege/search', payload)

    public save = async (payload: IPrivilege) => await this.instance.post<IPrivilege, AxiosResponse<IApiResponse<IPrivilege>>, IPrivilege>('privilege/save', payload)

    public update = async (payload: IPrivilege) => await this.instance.put<null, AxiosResponse<IApiResponse<null>>, IPrivilege>('privilege/update', payload)

    public delete = async (id: number) => await this.instance.delete<null, AxiosResponse<IApiResponse<null>>, IPrivilege>(`privilege/delete?id=${id.toString()}`)
}

export default PrivilegeService.getInstance()




