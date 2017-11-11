    
    
    import {playMode} from '../config'

    const state = {
        singer: {},
        // 播放状态
        playing: false,
        //播放列表
        playlist: [],
        //播放列表(随机播放时列表无序,与playlist区分)
        randomlist: [],
        //播放器是否全屏显示
        fullscreen: false,
        currentIndex: -1,
        palymode: playMode.sequence,
    }

    export default state