export interface IPrivilege {
    privilegeId?: number,
    privilegeName?: string,
}

export interface IPrivilegeState {
    privilege?: IPrivilege,
    privileges?: IPrivilege[],
    length: number
}

export interface IPrivilegeSearchReq {
    limit: number,
    page: number,
    key: string
}

export interface IPrivilegeSearchResp {
    length: number,
    privileges: IPrivilege[]
}