import { IPrivilege } from './privilege.types'

export interface IRole {
    roleId: number,
    roleName: string,
    privileges: IPrivilege[],
}

export interface IRoleState {
    role?: IRole,
    roles?: IRole[]
}