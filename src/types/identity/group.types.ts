//
// Group type(s)
//
import { IUser } from "./user.types"

export interface IGroup {
    groupId?: number,
    groupName: string,
    groupDescription?: string,
    users?: IUser[],
}

export interface IGroupState {
    group?: IGroup,
    groups?: IGroup[],
    length: number
}

export interface ISearchGroupsRequest {
    limit: number,
    page: number,
    key: string
}

export interface ISearchGroupsResponse {
    length: number,
    groups: IGroup[]
}

export interface IAddToUserRequest {
    groupId?: number,
    userId?: number,
}

export interface IRemoveFromUserRequest {
    groupId?: number,
    userId?: number,
}