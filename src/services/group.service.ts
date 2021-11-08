import Api from '../utils/helpers/api'
import config from '../config'
import { AxiosResponse } from 'axios'
import { IApiResponse, IGroup, IGroupSearchReq, IGroupSearchResp, IGroupUserReq } from '../types'

class GroupService extends Api {
    private static _instance?: GroupService

    private constructor() {
        super(config.API_URL)
    }

    // Fetches singleton object, so only one object is statically preserved in run time
    public static getInstance(): GroupService {
        if (!this._instance) this._instance = new GroupService()

        return this._instance
    }

    public search = async (payload: IGroupSearchReq) => await this.instance.post<IGroupSearchResp, AxiosResponse<IApiResponse<IGroupSearchResp>>, IGroupSearchReq>('group/search', payload)

    public save = async (payload: IGroup) => await this.instance.post<IGroup, AxiosResponse<IApiResponse<IGroup>>, IGroup>('group/save', payload)

    public saveMultiple = async (payload: IGroup[]) => await this.instance.post<IGroup[], AxiosResponse<IApiResponse<IGroup[]>>, IGroup[]>('group/saveMultiple', payload)

    public update = async (payload: IGroup) => await this.instance.put<null, AxiosResponse<IApiResponse<null>>, IGroup>('group/update', payload)

    public delete = async (id: number) => await this.instance.delete<null, AxiosResponse<IApiResponse<null>>, IGroup>(`group/delete?id=${id.toString()}`)

    public addGroupUser = async (payload: IGroupUserReq) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IGroupUserReq>('group/addGroupUser', payload)

    public deleteGroupUser = async (payload: IGroupUserReq) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IGroupUserReq>('group/deleteGroupUser', payload)
}

export default GroupService.getInstance()