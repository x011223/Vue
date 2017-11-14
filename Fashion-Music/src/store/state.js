    
    
    import {playMode} from '../config'

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
        playmode: playMode.sequence,
    }

    export default state