

    import * as types from './mutations-types'
    export const selectPlay = function ({commit, state}, {list, index}) {
        commit(types.Set_Play_List, list)
        commit(types.Set_Random_List, list)
        commit(types.Set_Full_Screen, true)
        commit(types.Set_Playing_State, true)
        commit(types.Set_Current_Index, index)
    }