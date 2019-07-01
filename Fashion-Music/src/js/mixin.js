import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from './config'
import { shuffle } from "./random"
export const playMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        },
    },
    methods: {
        // 由具体组件实现这个函数
        handlePlaylist() {
            // 否则抛出异常
            throw new Error('component must implement handlePlaylist method')
        }
    }
}

export const playerMixin = {
    methods: {
        changeMode() {
            // 切换播放模式
            const mode = (this.playmode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                // 打乱歌曲顺序，随机播放
                list = shuffle(this.sequenceList)
            } else if (mode === playMode.loop) {
                // 歌词滚动重新开始
                if (this.currentLyric) {
                    this.currentLyric.seek(0)
                }
                // 循环播放
                this.isLoop = true
                list = this.sequenceList
            } else {
                // 顺序播放
                list = this.sequenceList
            }
            this.resetCurrent(list)
            this.setPlayList(list)
        },
        // 使当前播放的歌曲index不变
        resetCurrent(list) {
            // let index = list.findIndex((item) => {
            //     return item.id === this.currentSong.id
            // })
            // findIndex ES6 语法
            let index = list.findIndex(item => item.id === this.currentSong.id)
            this.setCurrentIndex(index)
        },
        iconFav(song) {
            if (this.isFavorite(song)) {
                return 'icon-fav_on'
            } else {
                return 'icon-fav_off'
            }
        },
        toggleFavorite(song) {
            if (this.isFavorite(song)) {
                this.DeleteFavoriteList(song)
            } else {
                this.SaveFavoriteList(song)
            }
        },
        isFavorite(song) {
            let index = this.favoritelist.findIndex((item) => {
                return item.id === song.id
            })
            return index > -1
        },
        ...mapMutations({
            //通过mutations 修改是否全屏
            setFullScreen: 'Set_Full_Screen',
            // 播放状态
            setPlayingState: 'Set_Playing_State',
            //  当前歌曲的 index
            setCurrentIndex: 'Set_Current_Index',
            // 修改播放模式
            setPlayMode: 'Set_Play_Mode',
            setPlayList: 'Set_Play_List',
        }),
        ...mapActions([
            'SaveFavoriteList',
            'DeleteFavoriteList'
        ])
    },
    computed: {
        ...mapGetters([
            'fullscreen',
            'playlist',
            'playing',
            'currentSong',
            'currentIndex',
            'playmode',
            'sequenceList',
            'favoritelist'
        ]),
        // 播放模式图标
        iconMode() {
            return this.playmode === playMode.sequence ? '随机' : this.playmode === playMode.loop ? '单循' : '随机'
        }
    },
}

export const searchMixin = {
    data() {
        return {
            inputText: '',
            refreshTime: 420,
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ]),
    },
    methods: {
        saveHistory() {
            this.SaveSearchHistory(this.inputText)
        },
        inputBlur() {
            this.$refs.searchBox.blur()
        },
        // 填入input
        addSearchText(inputText) {
            this.$refs.searchBox.setSearchBox(inputText)
        },
        onTextChange(inputText) {
            this.inputText = inputText
        },
        ...mapActions([
            'SaveSearchHistory',
            'DeleteSearchHistory',
        ])
    },
}