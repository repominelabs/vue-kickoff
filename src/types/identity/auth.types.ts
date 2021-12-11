//
// Auth type(s)
//
import { IUser } from "./user.types"

export interface ILogin {
    username: string,
    password: string
}

export interface IRegister {
    username: string,
    password: string,
    email: string
}

export interface IRefreshToken {
    accessToken: string,
    refreshToken: string,
}

export interface IAuth {
    accessToken: string,
    refreshToken: string,
    user: IUser,
}

export interface IAuthState {
    accessToken?: string,
    refreshToken?: string,
    user?: IUser,
}