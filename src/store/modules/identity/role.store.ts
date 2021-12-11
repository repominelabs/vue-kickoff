import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IRole, IRoleState, ISearchRolesRequest, ISearchRolesResponse } from '../../../types'
import RoleService from '../../../services/identity/role.service'

const state: IRoleState = {
    role: undefined,
    roles: [],
    length: 0
}

const getters: GetterTree<IRoleState, IRootState> = {
    getrole(state): IRole | undefined {
        const { role } = state
        return role
    },
    getroles(state): IRole[] | undefined {
        const { roles } = state
        return roles
    }
}

const actions: ActionTree<IRoleState, IRootState> = {
    async searchRolesAsync({ commit }, payload: ISearchRolesRequest): Promise<any> {
        return await RoleService.searchRolesAsync(payload).then(response => {
            const data: ISearchRolesResponse = response && response.data && response.data.response
            commit('searchRolesAsync', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async saveRoleAsync({ commit }, payload: IRole): Promise<any> {
        return await RoleService.saveRoleAsync(payload).then(response => {
            const data: IRole = response && response.data && response.data.response
            commit('saveRoleAsync', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async updateRoleAsync({ commit }, payload: { role: IRole, index: number }): Promise<any> {
        return await RoleService.updateRoleAsync(payload.role).then(response => {
            const data: any = response && response.data && response.data.response
            commit('updateRoleAsync', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async deleteRoleAsync({ commit }, payload: { role: IRole, index: number }): Promise<any> {
        return await RoleService.deleteRoleAsync(payload.role).then(response => {
            const data: any = response && response.data && response.data
            commit('deleteRoleAsync', payload.index)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

const mutations: MutationTree<IRoleState> = {
    searchRolesAsync(state, data: ISearchRolesResponse) {
        state.roles = data.roles
        state.length = data.length
    },
    saveRoleAsync(state, data: IRole) {
        state.roles?.push(data)
    },
    updateRoleAsync(state, data: { role: IRole, index: number }) {
        if (state.roles != undefined) {
            state.roles[data.index] = Object.assign({}, data.role)
        }
    },
    deleteRoleAsync(state, index: number ) {
        if (state.roles != undefined) {
            state.roles.splice(1, index)
        }
    }
}

export const role: Module<IRoleState, IRootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}