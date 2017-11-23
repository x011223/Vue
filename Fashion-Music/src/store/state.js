    
    
    import {playMode} from '../js/config'
    import {loadSearch, loadPlay, loadFavorite} from '../js/cache'

    const state = {
        singer: {},
        // 播放状态
        playing: false,
        // 正在播放列表
        playlist: [],
        // 原始播放列表(与playlist区分)
        sequenceList: [],
        //播放器是否全屏显示
        fullscreen: false,
        currentIndex: -1,
        // 播放模式 顺序 随机 单曲
        playmode: playMode.sequence,
        // 歌单歌曲列表
        disc: {},
        toplist: [],
        searchHistory: loadSearch(),
        playHistory: loadPlay(),
        favoritelist: loadFavorite()
    }

    export default state