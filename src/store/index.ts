import Vuex, { StoreOptions } from 'vuex'
import { IRootState } from '../types'
import { auth } from './modules/auth.store'
import { group } from './modules/group.store'
import { user } from './modules/user.store'
import { role } from './modules/role.store'
import { privilege } from './modules/privilege.store'

const store: StoreOptions<IRootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        auth,
        group,
        user,
        role,
        privilege
    }
}

export default new Vuex.Store<IRootState>(store)