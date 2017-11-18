

    import * as types from './mutations-types'
    import {shuffle} from '../random'
    import {playMode} from '../config'

    // 查找列表中是否存在歌曲
    function findIndex (list, song) {
        return list.findIndex ((item) => {
            return item.id === song.id
        })
    }
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

    // 插入歌曲
    export const insertSong = function ({commit, state}, song) {
        let playlist = state.playlist
        let sequenceList = state.sequenceList
        let currentIndex = state.currentIndex
        // 记录当前歌曲
        let currentSong = playlist[currentIndex]
        // 查找当前播放列表是否存在需要插入的歌曲，返回其索引
        let fplIndex = findIndex (playlist, song)
        // 插入歌曲，索引加一
        currentIndex++
        // 插入歌曲到当前位置
        playlist.slice(currentIndex, 0, song)
        if (fplIndex > -1) {
            // 如果当前列表存在插入歌曲
            if (currentIndex > fplIndex) {
                // 如果当前索引大于原歌曲索引
                playlist.splice(fplIndex, 1)
                currentIndex--
            } else {
                // 如果当前索引小于原歌曲索引
                playlist.splice(fplIndex + 1, 1)
            }
        }
    }