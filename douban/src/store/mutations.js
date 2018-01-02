
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
            [types.get_listFiction] (state, listFiction) {
                state.listFiction = listFiction
            },
            [types.get_listUnFiction] (state, listUnFiction) {
                state.listUnFiction = listUnFiction
            },
        }

        export default mutations