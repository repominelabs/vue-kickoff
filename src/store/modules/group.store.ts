import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IGroup, IGroupState, IGroupSearchReq, IGroupSearchResp, IGroupUserReq, IUser } from '../../types'
import GroupService from '../../services/group.service'

const state: IGroupState = {
    group: undefined,
    groups: [],
    length: 0
}

const getters: GetterTree<IGroupState, IRootState> = {
    getUser(state): IGroup | undefined {
        const { group } = state
        return group
    },
    getgroups(state): IGroup[] | undefined {
        const { groups } = state
        return groups
    }
}

const actions: ActionTree<IGroupState, IRootState> = {
    async search({ commit }, payload: IGroupSearchReq): Promise<any> {
        return await GroupService.search(payload).then(response => {
            const data: IGroupSearchResp = response && response.data && response.data.response
            commit('search', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async save({ commit }, payload: IGroup): Promise<any> {
        return await GroupService.save(payload).then(response => {
            const data: IGroup = response && response.data && response.data.response
            commit('save', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async update({ commit }, payload: { group: IGroup, index: number }): Promise<any> {
        return await GroupService.update(payload.group).then(response => {
            const data: any = response && response.data && response.data.response
            commit('update', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async delete({ commit }, payload: { groupId: number, index: number }): Promise<any> {
        return await GroupService.delete(payload.groupId).then(response => {
            const data: any = response && response.data && response.data
            commit('delete', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async addGroupUser({ commit }, payload: { user: IUser, groupUserReq: IGroupUserReq, groupIndex: number, userIndex: number }): Promise<any> {
        return await GroupService.addGroupUser(payload.groupUserReq).then(response => {
            const data: any = response && response.data && response.data
            commit('addGroupUser')

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async deleteGroupUser({ commit }, payload: { groupUserReq: IGroupUserReq, groupIndex: number, userIndex: number }): Promise<any> {
        return await GroupService.deleteGroupUser(payload.groupUserReq).then(response => {
            const data: any = response && response.data && response.data
            commit('deleteGroupUser', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

const mutations: MutationTree<IGroupState> = {
    search(state, data: IGroupSearchResp) {
        state.groups = data.groups
        state.length = data.length
    },
    save(state, data: IGroup) {
        state.groups?.push(data)
    },
    update(state, data: { group: IGroup, index: number }) {
        if (state.groups != undefined) {
            state.groups[data.index] = Object.assign({}, data.group)
        }
    },
    delete(state, data: { groupId: number, index: number }) {
        if (state.groups != undefined) {
            state.groups.splice(1, data.index)
        }
    },
    addGroupUser(state, data: { user: IUser, groupUserReq: IGroupUserReq, groupIndex: number, userIndex: number }) {
        if (state.groups != undefined) {
            state.groups[data.groupIndex].users?.push(data.user)
        }
    },
    deleteGroupUser(state, data: { groupIndex: number, userIndex: number }) {
        if (state.groups != undefined) {
            state.groups[data.groupIndex].users?.splice(1, data.userIndex)
        }
    }
}

export const group: Module<IGroupState, IRootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}