import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IRole, IRoleState, IRoleSearchReq, IRoleSearchResp } from '../../types'
import RoleService from '../../services/role.service'

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
    async search({ commit }, payload: IRoleSearchReq): Promise<any> {
        return await RoleService.search(payload).then(response => {
            const data: IRoleSearchResp = response && response.data && response.data.response
            commit('search', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async save({ commit }, payload: IRole): Promise<any> {
        return await RoleService.save(payload).then(response => {
            const data: IRole = response && response.data && response.data.response
            commit('save', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async update({ commit }, payload: { role: IRole, index: number }): Promise<any> {
        return await RoleService.update(payload.role).then(response => {
            const data: any = response && response.data && response.data.response
            commit('update', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async delete({ commit }, payload: { roleId: number, index: number }): Promise<any> {
        return await RoleService.delete(payload.roleId).then(response => {
            const data: any = response && response.data && response.data
            commit('delete', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

const mutations: MutationTree<IRoleState> = {
    search(state, data: IRoleSearchResp) {
        state.roles = data.roles
        state.length = data.length
    },
    save(state, data: IRole) {
        state.roles?.push(data)
    },
    update(state, data: { role: IRole, index: number }) {
        if (state.roles != undefined) {
            state.roles[data.index] = Object.assign({}, data.role)
        }
    },
    delete(state, data: { roleId: number, index: number }) {
        if (state.roles != undefined) {
            state.roles.splice(1, data.index)
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