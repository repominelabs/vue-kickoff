import { IPrivilege } from './privilege.types'

export interface IRole {
    roleId?: number,
    roleName: string,
    color?: string,
    privileges?: IPrivilege[],
}

export interface IRoleState {
    role?: IRole,
    roles?: IRole[],
    length: number
}

export interface IRoleSearchReq {
    limit: number,
    page: number,
    key: string
}

export interface IRoleSearchResp {
    length: number,
    roles: IRole[]
}

export interface IRolePrivilegeReq {
    roleId?: number,
    privilegeId?: number
}