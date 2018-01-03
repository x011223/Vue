
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
            }
        }

        export default mutations