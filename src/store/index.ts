import Vuex, { StoreOptions } from 'vuex'
import { IRootState } from '../types'
import { auth } from './modules/auth.store'
import { user } from './modules/user.store'
import { role } from './modules/role.store'

const store: StoreOptions<IRootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        auth,
        user,
        role
    }
}

export default new Vuex.Store<IRootState>(store)