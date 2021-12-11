import Api from '../../utils/helpers/api'
import config from '../../config'
import { AxiosResponse } from 'axios'
import { IApiResponse, IGroup, ISearchGroupsRequest, ISearchGroupsResponse, IAddToUserRequest, IRemoveFromUserRequest } from '../../types'

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

    public searchGroupsAsync = async (payload: ISearchGroupsRequest) => await this.instance.post<ISearchGroupsResponse, AxiosResponse<IApiResponse<ISearchGroupsResponse>>, ISearchGroupsRequest>('identity/group/search-groups', payload)

    public saveGroupAsync = async (payload: IGroup) => await this.instance.post<IGroup, AxiosResponse<IApiResponse<IGroup>>, IGroup>('identity/group/save-group', payload)

    public updateGroupAsync = async (payload: IGroup) => await this.instance.put<null, AxiosResponse<IApiResponse<null>>, IGroup>('identity/group/update-group', payload)

    public deleteGroupAsync = async (payload: IGroup) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IGroup>('identity/group/delete-group', payload)

    public addToUserAsync = async (payload: IAddToUserRequest) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IAddToUserRequest>('identity/group/add-to-user', payload)

    public removeFromUserAsync = async (payload: IRemoveFromUserRequest) => await this.instance.post<null, AxiosResponse<IApiResponse<null>>, IRemoveFromUserRequest>('identity/group/remove-from-user', payload)
}

export default GroupService.getInstance()