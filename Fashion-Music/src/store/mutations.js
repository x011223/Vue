

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
        [types.Set_Disc_Detail] (state, disc) {
            state.disc = disc
        },
        [types.Set_Top_List] (state, toplist) {
            state.toplist = toplist
        },
        [types.Set_Search_History] (state, history) {
            state.searchHistory = history
        },
        [types.Set_Play_History] (state, history) {
            state.playHistory = history
        },
        [types.Set_Favorite_list] (state, list) {
            state.favoritelist = list
        }
    }
    export default mutations