import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IPrivilege, IPrivilegeState, IPrivilegeSearchReq, IPrivilegeSearchResp } from '../../types'
import PrivilegeService from '../../services/privilege.service'

const state: IPrivilegeState = {
    privilege: undefined,
    privileges: [],
    length: 0
}

const getters: GetterTree<IPrivilegeState, IRootState> = {
    getPrivilege(state): IPrivilege | undefined {
        const { privilege } = state
        return privilege
    },
    getPrivileges(state): IPrivilege[] | undefined {
        const { privileges } = state
        return privileges
    }
}

const actions: ActionTree<IPrivilegeState, IRootState> = {
    async search({ commit }, payload: IPrivilegeSearchReq): Promise<any> {
        return await PrivilegeService.search(payload).then(response => {
            const data: IPrivilegeSearchResp = response && response.data && response.data.response
            commit('search', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async save({ commit }, payload: IPrivilege): Promise<any> {
        return await PrivilegeService.save(payload).then(response => {
            const data: IPrivilege = response && response.data && response.data.response
            commit('save', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async update({ commit }, payload: { privilege: IPrivilege, index: number }): Promise<any> {
        return await PrivilegeService.update(payload.privilege).then(response => {
            const data: any = response && response.data && response.data.response
            commit('update', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async delete({ commit }, payload: { privilegeId: number, index: number }): Promise<any> {
        return await PrivilegeService.delete(payload.privilegeId).then(response => {
            const data: any = response && response.data && response.data
            commit('delete', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
}

const mutations: MutationTree<IPrivilegeState> = {
    search(state, data: IPrivilegeSearchResp) {
        state.privileges = data.privileges
        state.length = data.length
    },
    save(state, data: IPrivilege) {
        state.privileges?.push(data)
    },
    update(state, data: { privilege: IPrivilege, index: number }) {
        if (state.privileges != undefined) {
            state.privileges[data.index] = Object.assign({}, data.privilege)
        }
    },
    delete(state, data: { privilegeId: number, index: number }) {
        if (state.privileges != undefined) {
            state.privileges.splice(1, data.index)
        }
    }
}

export const privilege: Module<IPrivilegeState, IRootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}