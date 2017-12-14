        
        
        import * as types from './mutation_types'

        const mutations = {
            [types.Search_Show_Flag] (state, searchShowFlag) {
                state.searchShowFlag = searchShowFlag
            },
            [types.Set_Order_Title] (state, orderTitle) {
                state.orderTitle = orderTitle
            },
            [types.Set_Is_Order] (state, isOrder) {
                state.isOrder = isOrder
            },
        }

        export default mutations