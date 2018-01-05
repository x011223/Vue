
        import * as types from './mutations_type'

        export const mutations = {
            [types.get_HotMovies] (state, HotMovies) {
                state.HotMovies = HotMovies
            },
            [types.get_FreeMovies] (state, FreeMovies) {
                state.FreeMovies = FreeMovies
            },
            [types.get_NewMovies] (state, NewMovies) {
                state.NewMovies = NewMovies
            },
            [types.get_FictionBooks] (state, FictionBooks) {
                state.FictionBooks = FictionBooks
            },
            [types.get_UnFictionBooks] (state, UnFictionBooks) {
                state.UnFictionBooks = UnFictionBooks
            },
            [types.get_RecommendFeed] (state, RecommendFeed) {
                state.RecommendFeed = RecommendFeed
            },
            [types.set_IsMore] (state, isMore) {
                state.isMore = isMore
            },
            [types.get_StoreHeader] (state, StoreHeader) {
                state.StoreHeader = StoreHeader
            },
            [types.set_RecommendDate] (state, RecommendDate) {
                state.RecommendDate = RecommendDate
            },
            [types.get_ArrayRecommend] (state, ArrayRecommend) {
                state.ArrayRecommend = ArrayRecommend
            },
            [types.get_RecommendBefore] (state, RecommendBefore) {
                state.RecommendBefore = RecommendBefore
            },
        }

        export default mutations