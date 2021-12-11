//
// User type(s)
//
import { IRole } from "./role.types"

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

export interface ISearchUsersRequest {
    limit: number,
    page: number,
    key: string
}

export interface ISearchUsersResponse {
    length: number,
    users: IUser[]
}

export interface IAddToRoleRequest {
    userId?: number,
    roleId?: number,
}

export interface IRemoveFromRoleRequest {
    userId?: number,
    roleId?: number,
}