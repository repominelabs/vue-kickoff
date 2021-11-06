import { IPrivilege } from './privilege.types'

export interface IRole {
    roleId?: number,
    roleName: string,
    color?: string,
    privileges?: IPrivilege[],
}

export interface IRoleState {
    role?: IRole,
    roles?: IRole[]
}