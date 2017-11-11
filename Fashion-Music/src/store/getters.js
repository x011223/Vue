
    //取state中的数据到组件中
    export const singer = state => state.singer
    export const playing = state => state.playing
    export const playlist = state => state.playlist
    export const randomlist = state => state.randomlist
    export const fullscreen = state => state.fullscreen
    export const currentIndex = state => state.currentIndex
    export const playmode = state => state.palymode

    export const currentSong = (state) => {
        return state.playlist[state.currentIndex] || {}
    }