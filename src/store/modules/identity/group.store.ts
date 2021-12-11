import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IGroup, IGroupState, ISearchGroupsRequest, ISearchGroupsResponse, IAddToUserRequest, IRemoveFromUserRequest, IUser } from '../../../types'
import GroupService from '../../../services/identity/group.service'

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
    async searchGroupsAsync({ commit }, payload: ISearchGroupsRequest): Promise<any> {
        return await GroupService.searchGroupsAsync(payload).then(response => {
            const data: ISearchGroupsResponse = response && response.data && response.data.response
            commit('searchGroupsAsync', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async saveGroupAsync({ commit }, payload: IGroup): Promise<any> {
        return await GroupService.saveGroupAsync(payload).then(response => {
            const data: IGroup = response && response.data && response.data.response
            commit('saveGroupAsync', data)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async updateGroupAsync({ commit }, payload: { group: IGroup, index: number }): Promise<any> {
        return await GroupService.updateGroupAsync(payload.group).then(response => {
            const data: any = response && response.data && response.data.response
            commit('updateGroupAsync', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async deleteGroupAsync({ commit }, payload: { group: IGroup, index: number }): Promise<any> {
        return await GroupService.deleteGroupAsync(payload.group).then(response => {
            const data: any = response && response.data && response.data
            commit('deleteGroupAsync', payload.index)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async addToUserAsync({ commit }, payload: { user: IUser, groupUserReq: IAddToUserRequest, groupIndex: number, userIndex: number }): Promise<any> {
        return await GroupService.addToUserAsync(payload.groupUserReq).then(response => {
            const data: any = response && response.data && response.data
            commit('addToUserAsync')

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async removeFromUserAsync({ commit }, payload: { groupUserReq: IRemoveFromUserRequest, groupIndex: number, userIndex: number }): Promise<any> {
        return await GroupService.removeFromUserAsync(payload.groupUserReq).then(response => {
            const data: any = response && response.data && response.data
            commit('removeFromUserAsync', payload)

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

const mutations: MutationTree<IGroupState> = {
    searchGroupsAsync(state, data: ISearchGroupsResponse) {
        state.groups = data.groups
        state.length = data.length
    },
    saveGroupAsync(state, data: IGroup) {
        state.groups?.push(data)
    },
    updateGroupAsync(state, data: { group: IGroup, index: number }) {
        if (state.groups != undefined) {
            state.groups[data.index] = Object.assign({}, data.group)
        }
    },
    deleteGroupAsync(state, index: number ) {
        if (state.groups != undefined) {
            state.groups.splice(1, index)
        }
    },
    addToUserAsync(state, data: { user: IUser, groupUserReq: IAddToUserRequest, groupIndex: number, userIndex: number }) {
        if (state.groups != undefined) {
            state.groups[data.groupIndex].users?.push(data.user)
        }
    },
    removeFromUserAsync(state, data: { groupIndex: number, userIndex: number }) {
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