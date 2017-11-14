

    import * as types from './mutations-types'
    import {shuffle} from '../random'
    import {playMode} from '../config'

    // function findIndex (list, song) {
    //     return list.findIndex ((item) => {
    //         return item.id === song.id
    //     })
    // }
    export const selectPlay = function ({commit, state}, {list, index}) {       
        commit(types.Set_Sequence_List, list)
        commit(types.Set_Play_List, list)
        commit(types.Set_Full_Screen, true)
        commit(types.Set_Playing_State, true)
        commit(types.Set_Current_Index, index)
    }
    // 点击随机播放全部
    export const randomPlay = function ({commit, state}, {list, index}) {
        // 设置播放模式为随机
        commit(types.Set_Play_Mode, playMode.random)
        commit(types.Set_Sequence_List, list)
        // 将列表随机排序
        let randomList = shuffle(list)
        commit(types.Set_Play_List, randomList)
        // 播放该随机列表第一首歌
        commit(types.Set_Current_Index, 0)
        commit(types.Set_Full_Screen, true)
        commit(types.Set_Playing_State, true)      
    }