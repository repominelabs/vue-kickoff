import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { IRootState, IUser, IUserState, IUserSearchReq, IUserSearchResp } from '../../types'
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
    async update({ commit }, payload: IUser): Promise<any> {
        return await UserService.update(payload).then(response => {
            const data: any = response && response.data && response.data.response
            commit('update')

            return Promise.resolve(data)
        }).catch(error => {
            return Promise.reject(error)
        })
    },
    async delete({ commit }, id: number): Promise<any> {
        return await UserService.delete(id).then(response => {
            const data: any = response && response.data && response.data.response
            commit('delete')

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
    update(state) {

    },
    delete(state) {

    }
}

export const auth: Module<IUserState, IRootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}