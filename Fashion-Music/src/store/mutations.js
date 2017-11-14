

    import * as types from './mutations-types'

    //提交mutations 修改数据
    const mutations = {
        [types.Set_Singer] (state, singer) {
            state.singer = singer
        },

        [types.Set_Playing_State] (state, flag) {
            state.playing = flag
        },

        [types.Set_Play_List] (state, list) {
            state.playlist = list
        },
        [types.Set_Sequence_List] (state, list) {
            state.sequenceList = list
        },
        [types.Set_Full_Screen] (state, flag) {
            state.fullscreen = flag
        },
        [types.Set_Current_Index] (state, singer) {
            state.currentIndex = singer
        },
        [types.Set_Play_Mode] (state, mode) {
            state.playmode = mode
        },
    }
    export default mutations