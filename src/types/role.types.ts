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

export interface IRoleSearchReq {
    limit: number,
    page: number,
    key: string
}

export interface IRoleSearchResp {
    length: number,
    roles: IRole[]
}