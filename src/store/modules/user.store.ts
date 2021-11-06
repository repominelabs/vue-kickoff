import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IUser, IUserState, IUserSearchReq, IUserSearchResp, IUserRoleReq, IRole } from '../../types'
import UserService from '../../services/user.service'

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
    async search({ commit }, payload: IUserSearchReq): Promise<any> {
        return await UserService.search(payload).then(response => {
            const data: IUserSearchResp = response && response.data && response.data.response
            commit('search', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async save({ commit }, payload: IUser): Promise<any> {
        return await UserService.save(payload).then(response => {
            const data: IUser = response && response.data && response.data.response
            commit('save', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async saveMultiple({ commit }, payload: IUser[]): Promise<any> {
        return await UserService.saveMultiple(payload).then(response => {
            const data: IUser[] = response && response.data && response.data.response
            commit('saveMultiple', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async update({ commit }, payload: { user: IUser, index: number }): Promise<any> {
        return await UserService.update(payload.user).then(response => {
            const data: any = response && response.data && response.data.response
            commit('update', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async delete({ commit }, payload: { userId: number, index: number }): Promise<any> {
        return await UserService.delete(payload.userId).then(response => {
            const data: any = response && response.data && response.data
            commit('delete', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async addUserRole({ commit }, payload: { role: IRole, userRoleReq: IUserRoleReq, userIndex: number, roleIndex: number }): Promise<any> {
        return await UserService.addUserRole(payload.userRoleReq).then(response => {
            const data: any = response && response.data && response.data
            commit('addUserRole')

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async deleteUserRole({ commit }, payload: { userRoleReq: IUserRoleReq, userIndex: number, roleIndex: number }): Promise<any> {
        return await UserService.deleteUserRole(payload.userRoleReq).then(response => {
            const data: any = response && response.data && response.data
            commit('deleteUserRole', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

const mutations: MutationTree<IUserState> = {
    search(state, data: IUserSearchResp) {
        state.users = data.users
        state.length = data.length
    },
    save(state, data: IUser) {
        state.users?.push(data)
    },
    saveMultiple(state, data: IUser[]) {
        for (let i = 0; i < data.length; i++) {
            state.users?.push(data[i])
        }
    },
    update(state, data: { user: IUser, index: number }) {
        if (state.users != undefined) {
            state.users[data.index] = Object.assign({}, data.user)
        }
    },
    delete(state, data: { userId: number, index: number }) {
        if (state.users != undefined) {
            state.users.splice(1, data.index)
        }
    },
    addUserRole(state, data: { role: IRole, userRoleReq: IUserRoleReq, userIndex: number, roleIndex: number }) {
        if (state.users != undefined) {
            state.users[data.userIndex].roles?.push(data.role)
        }
    },
    deleteUserRole(state, data: { userIndex: number, roleIndex: number }) {
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