import { IUser } from './user.types'

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

export interface IGroupSearchReq {
    limit: number,
    page: number,
    key: string
}

export interface IGroupSearchResp {
    length: number,
    groups: IGroup[]
}

export interface IGroupUserReq {
    groupId?: number,
    userId?: number,
}