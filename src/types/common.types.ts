export interface IApiResponse<T> {
    response: T,
    status: boolean,
    errorCode: number,
    errorDesc: string
}