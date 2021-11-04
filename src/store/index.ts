import Vuex, { StoreOptions } from 'vuex'
import { IRootState } from '../types'
import { auth } from './modules/auth.store'

const store: StoreOptions<IRootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        auth
    }
}

export default new Vuex.Store<IRootState>(store)