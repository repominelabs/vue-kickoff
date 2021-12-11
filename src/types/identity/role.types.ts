//
// Role type(s)
//
export interface IRole {
    roleId?: number,
    roleName: string,
    color?: string,
}

export interface IRoleState {
    role?: IRole,
    roles?: IRole[],
    length: number
}

export interface ISearchRolesRequest {
    limit: number,
    page: number,
    key: string
}

export interface ISearchRolesResponse {
    length: number,
    roles: IRole[]
}