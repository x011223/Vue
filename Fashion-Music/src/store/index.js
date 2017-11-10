    
    
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)

    import * as getters from "./getters"
    import * as actions from './actions'
    import mutations from './mutations'
    import state from './state'
    // import * as mutations from './mutations'
    // import * as state from './state'


    const debug = process.env.NODE_ENV !== 'production'
    import createLogger from 'vuex/dist/logger'

    export default new Vuex.Store({
        actions,
        getters,
        state,
        mutations,
        strict: debug,
        plugins: debug ? [createLogger()] : []
    })