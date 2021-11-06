import Vuex, { StoreOptions } from 'vuex'
import { IRootState } from '../types'
import { auth } from './modules/auth.store'
import { user } from './modules/user.store'

const store: StoreOptions<IRootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        auth,
        user
    }
}

export default new Vuex.Store<IRootState>(store)