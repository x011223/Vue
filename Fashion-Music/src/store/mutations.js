

    import * as types from './mutations-types'

    //提交mutations 修改数据
    const mutations = {
        [types.Set_Singer] (state, singer) {
            state.singer = singer
        }
    }
    export default mutations