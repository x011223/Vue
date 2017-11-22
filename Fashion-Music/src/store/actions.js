

    import * as types from './mutations-types'
    import {shuffle} from '../js/random'
    import {playMode} from '../js/config'
    import {saveSearch, deleteSearch, clearHistory, savePlay} from '../js/cache'


    // 查找列表中是否存在歌曲
    function findIndex (list, song) {
        return list.findIndex ((item) => {
            return item.id === song.id       
        })
    }
    // 播放选择的歌曲
    export const selectPlay = function ({commit, state}, {list, index}) {       
        commit(types.Set_Sequence_List, list)
        if (state.playmode === playMode.random) {
            let randomList = shuffle(list)
            commit(types.Set_Play_List, randomList)
            index = findIndex(randomList, list[index])
        } else {
            commit(types.Set_Play_List, list)
        }
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
        let playlist = state.playlist.slice()
        let sequenceList = state.sequenceList.slice()
        let currentIndex = state.currentIndex
        // 记录当前歌曲
        let currentSong = playlist[currentIndex]
        // 查找当前播放列表是否存在需要插入的歌曲，返回其索引
        let fplIndex = findIndex (playlist, song)
        // 插入歌曲，索引加一
        currentIndex++
        // 插入歌曲到当前位置
        playlist.splice(currentIndex, 0, song)
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
        let currentIndex_1 = findIndex(sequenceList, currentSong) + 1
        let fslIndex = findIndex(sequenceList, song) 
        sequenceList.splice(currentIndex_1, 0, song)
        if (fslIndex > -1) {
            if (currentIndex_1 > fslIndex) {
                sequenceList.splice(fslIndex, 1)
            } else {
                sequenceList.splice(fslIndex + 1, 1)
            }    
        }    
        commit(types.Set_Play_List, playlist)
        commit(types.Set_Sequence_List, sequenceList)
        commit(types.Set_Current_Index, currentIndex)
        commit(types.Set_Full_Screen, true)
        commit(types.Set_Playing_State, true)        
    }

    // 保存搜索历史
    export const SaveSearchHistory = function ({commit}, query) {
        commit(types.Set_Search_History, saveSearch(query))
    }

    export const DeleteSearchHistory = function ({commit}, query) {
        commit(types.Set_Search_History, deleteSearch(query))
    }

    export const ClearSearchHistory = function ({commit}) {
        commit(types.Set_Search_History, clearHistory())
    }

    export const deleteSongs = function ({commit, state}, song) {
        let playlist = state.playlist.slice()
        let sequenceList = state.sequenceList.slice()
        let currentIndex = state.currentIndex
        let pIndex = findIndex(playlist, song) 
        playlist.splice(pIndex, 1)
        let sIndex = findIndex(sequenceList, song) 
        sequenceList.splice(sIndex, 1)        
        if (pIndex < currentIndex || currentIndex === playlist.length) {
            currentIndex--
        }
        commit(types.Set_Play_List, playlist)
        commit(types.Set_Sequence_List, sequenceList)
        commit(types.Set_Current_Index, currentIndex)
        const playL = playlist.length > 0
        commit(types.Set_Playing_State, playL)
    }

    export const clearSong = function ({commit}) {
        commit(types.Set_Current_Index, -1)
        commit(types.Set_Playing_State, false)
        commit(types.Set_Play_List, [])
        commit(types.Set_Sequence_List, [])
    }

    export const SavePlayHistory = function ({commit}, play) {
        commit(types.Set_Play_History, savePlay(play))
    }