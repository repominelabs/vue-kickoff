import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IAuth, IAuthState, IUser, ILogin, IRegister, IRefreshToken } from '../../../types'
import router from '../../../router'
import StorageService from '../../../services/common/storage.service'
import AuthService from '../../../services/identity/auth.service'

const LOCAL_STORAGE_ACCESS_TOKEN = 'ACCESS_TOKEN'
const LOCAL_STORAGE_REFRESH_TOKEN = 'REFRESH_TOKEN'
const LOCAL_STORAGE_USER = 'USER'

const state: IAuthState = {
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
}

const getters: GetterTree<IAuthState, IRootState> = {
    isAuthenticated(state): boolean {
        const { accessToken, user } = state

        return accessToken != undefined && user != undefined
    }
}

const actions: ActionTree<IAuthState, IRootState> = {
    async login({ commit }, payload: ILogin): Promise<any> {
        return await AuthService.login(payload).then(response => {
            const data: IAuth = response && response.data && response.data.response
            commit('login', data)
            router.push('/')

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async register({ commit }, payload: IRegister): Promise<any> {
        return await AuthService.register(payload).then(response => {
            const data: IUser = response && response.data && response.data.response
            commit('register')

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async refreshToken({ commit }, payload: IRefreshToken): Promise<any> {
        return await AuthService.refreshToken(payload).then(response => {
            const data: IRefreshToken = response && response.data && response.data.response
            commit('refreshToken', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async logout({ commit }): Promise<any> {
        return await AuthService.logout().then(response => {
            const data: any = response && response.data && response.data.response
            commit('logout')

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

const mutations: MutationTree<IAuthState> = {
    login(state, data: IAuth) {
        StorageService.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken)
        StorageService.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken)
        StorageService.setItem(LOCAL_STORAGE_USER, JSON.stringify(data.user))
        state.user = data.user
        state.accessToken = data.accessToken
        state.refreshToken = data.refreshToken
    },
    register(state, data: IUser) {
        state.user = data
    },
    refreshToken(state, data: IRefreshToken) {
        StorageService.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken)
        StorageService.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken)
        state.accessToken = data.accessToken
        state.refreshToken = data.refreshToken
    },
    logout(state) {
        StorageService.removeItems([LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_REFRESH_TOKEN, LOCAL_STORAGE_USER])
        state.user = undefined
        state.accessToken = undefined
        state.refreshToken = undefined
    }
}

export const auth: Module<IAuthState, IRootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}