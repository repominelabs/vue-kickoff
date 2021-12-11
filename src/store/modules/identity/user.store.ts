import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IUser, IUserState, ISearchUsersRequest, ISearchUsersResponse, IAddToRoleRequest, IRemoveFromRoleRequest, IRole } from '../../../types'
import UserService from '../../../services/identity/user.service'

const state: IUserState = {
    user: undefined,
    users: [],
    length: 0
}

const getters: GetterTree<IUserState, IRootState> = {
    getUser(state): IUser | undefined {
        const { user } = state
        return user
    },
    getUsers(state): IUser[] | undefined {
        const { users } = state
        return users
    }
}

const actions: ActionTree<IUserState, IRootState> = {
    async searchUsersAsync({ commit }, payload: ISearchUsersRequest): Promise<any> {
        return await UserService.searchUsersAsync(payload).then(response => {
            const data: ISearchUsersResponse = response && response.data && response.data.response
            commit('searchUsersAsync', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async saveUserAsync({ commit }, payload: IUser): Promise<any> {
        return await UserService.saveUserAsync(payload).then(response => {
            const data: IUser = response && response.data && response.data.response
            commit('saveUserAsync', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async saveMultipleUserAsync({ commit }, payload: IUser[]): Promise<any> {
        return await UserService.saveMultipleUserAsync(payload).then(response => {
            const data: IUser[] = response && response.data && response.data.response
            commit('saveMultipleUserAsync', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async updateUserAsync({ commit }, payload: { user: IUser, index: number }): Promise<any> {
        return await UserService.updateUserAsync(payload.user).then(response => {
            const data: any = response && response.data && response.data.response
            commit('updateUserAsync', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async deleteUserAsync({ commit }, payload: { user: IUser, index: number }): Promise<any> {
        return await UserService.deleteUserAsync(payload.user).then(response => {
            const data: any = response && response.data && response.data
            commit('deleteUserAsync', payload.index)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async addToRoleAsync({ commit }, payload: { role: IRole, userRoleReq: IAddToRoleRequest, userIndex: number, roleIndex: number }): Promise<any> {
        return await UserService.addToRoleAsync(payload.userRoleReq).then(response => {
            const data: any = response && response.data && response.data
            commit('addToRoleAsync')

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async removeFromRoleAsync({ commit }, payload: { userRoleReq: IRemoveFromRoleRequest, userIndex: number, roleIndex: number }): Promise<any> {
        return await UserService.removeFromRoleAsync(payload.userRoleReq).then(response => {
            const data: any = response && response.data && response.data
            commit('removeFromRoleAsync', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

const mutations: MutationTree<IUserState> = {
    searchUsersAsync(state, data: ISearchUsersResponse) {
        state.users = data.users
        state.length = data.length
    },
    saveUserAsync(state, data: IUser) {
        state.users?.push(data)
    },
    saveMultipleUserAsync(state, data: IUser[]) {
        for (let i = 0; i < data.length; i++) {
            state.users?.push(data[i])
        }
    },
    updateUserAsync(state, data: { user: IUser, index: number }) {
        if (state.users != undefined) {
            state.users[data.index] = Object.assign({}, data.user)
        }
    },
    deleteUserAsync(state, index: number) {
        if (state.users != undefined) {
            state.users.splice(1, index)
        }
    },
    addToRoleAsync(state, data: { role: IRole, userRoleReq: IAddToRoleRequest, userIndex: number, roleIndex: number }) {
        if (state.users != undefined) {
            state.users[data.userIndex].roles?.push(data.role)
        }
    },
    removeFromRoleAsync(state, data: { userIndex: number, roleIndex: number }) {
        if (state.users != undefined) {
            state.users[data.userIndex].roles?.splice(1, data.roleIndex)
        }
    }
}

export const user: Module<IUserState, IRootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}