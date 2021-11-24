import { IRole } from './role.types'

export interface IUser {
    userId?: number,
    username?: string,
    password?: string,
    name?: string,
    surname?: string,
    email?: string,
    phone?: string,
    gender?: string,
    dateOfBirth?: Date,
    address?: string,
    roles?: IRole[],
}

export interface IUserState {
    user?: IUser,
    users?: IUser[],
    length: number
}

export interface IUserSearchReq {
    limit: number,
    page: number,
    key: string
}

export interface IUserSearchResp {
    length: number,
    users: IUser[]
}

export interface IUserRoleReq {
    userId?: number,
    roleId?: number,
}