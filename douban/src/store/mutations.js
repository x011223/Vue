
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
            [types.set_Movie] (state, Movie) {
                state.Movie = Movie
            },
            [types.set_Book] (state, Book) {
                state.Book = Book
            },
            [types.set_GroupOfMovie] (state, GroupOfMovie) {
                state.GroupOfMovie = GroupOfMovie
            },
            [types.set_GroupOfBook] (state, GroupOfBook) {
                state.GroupOfBook = GroupOfBook
            },
            [types.set_GroupOfMusic] (state, GroupOfMusic) {
                state.GroupOfMusic = GroupOfMusic
            },
            [types.set_GroupOfNew] (state, GroupOfNew) {
                state.GroupOfNew = GroupOfNew
            },
            [types.set_GroupOfSameCity] (state, GroupOfSameCity) {
                state.GroupOfSameCity = GroupOfSameCity
            },
            [types.set_GroupOfWorkPlace] (state, GroupOfWorkPlace) {
                state.GroupOfWorkPlace = GroupOfWorkPlace
            },
            [types.set_GroupItem] (state, GroupItem) {
                state.GroupItem = GroupItem
            },
        }

        export default mutations