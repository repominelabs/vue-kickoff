export interface IPrivilege {
    privilegeId?: number,
    privilegeName?: string,
}

export interface IPrivilegeState {
    privilege?: IPrivilege,
    privileges?: IPrivilege[]
}