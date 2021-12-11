import Vuex, { StoreOptions } from 'vuex'
import { IRootState } from '../types'
import { auth } from './modules/identity/auth.store'
import { group } from './modules/identity/group.store'
import { user } from './modules/identity/user.store'
import { role } from './modules/identity/role.store'

const store: StoreOptions<IRootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        auth,
        group,
        user,
        role,
    }
}

export default new Vuex.Store<IRootState>(store)