<template>
    <div class="player" v-show="playlist.length > 0">
        <transition name="mainPlayer">
            <div class="main-player" v-show="fullscreen">
                <div class="bac-image">
                    <img :src="currentSong.image" width="100%" height="100%">
                </div>
                <div class="player-top" enter-active-class="topEnter">
                    <div class="player-back" @click="playerBack">
                        <img class="icon-back" src="../music-list/back.svg" width="24" height="24">
                    </div>
                    <h1 class="player-Song_name" v-html="currentSong.name"></h1>
                    <h2 class="player-Singer_name" v-html="currentSong.singer"></h2>
                </div>
                <div class="player-middle">
                    <div class="middle-l">
                        <div class="cd-wrapper">
                            <div class="cd" :class="cdPlay">
                                <img class="cd-image" :src="currentSong.image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="player-bottom" enter-active-class="bottomEnter">
                    <div class="player-progress">
                        <span class="play-time play-timeL">{{formatTime(currentTime)}}</span>
                        <div class="progress-wrapper">
                            <progress-bar :playsPercent="playsPercent" @percentChange="onPercentChange"></progress-bar>
                        </div>
                        <span class="play-time play-timeR">{{formatTime(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="operator operator-left play-order" @click.stop.prevent="changeMode">
                            <img src="./sequence.svg" v-show="this.playMode === 0">
                            <img src="./random.svg" v-show="this.playMode === 1">
                            <img src="./loop.svg" v-show="this.playMode === 2">
                        </div>
                        <div class="operator operator-left prev-song" :class="disableTouch">
                            <img @click="prevSong" src="./prev_song.svg">
                        </div>
                        <div class="operator operator-center play-state" :class="disableTouch">
                            <img src="./pause_song.svg" v-show="!this.playing" @click.stop.prevent="togglePlaying">
                            <img src="./plays_song.svg" v-show="this.playing" @click.stop.prevent="togglePlaying">
                        </div>
                        <div class="operator operator-right next-song" :class="disableTouch">
                            <img @click="nextSong" src="./next_song.svg" >
                        </div>
                        <div class="operator operator-right song-fav">
                            <img src="./fav_off.svg">
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="miniPlayer">
            <div class="mini-player" v-show="!fullscreen" @click.stop.prevent="playerOpen">
                <div class="mini-icon">
                    <img :src="currentSong.image" width="40" height="40" :class="cdPlay">
                </div>
                <div class="mini-text">
                    <h2 class="mini-Song_name" v-html="currentSong.name"></h2>
                    <p class="mini-Singer_name" v-html="currentSong.singer"></p>
                </div>
                <div class="control-progress">
                    <div class="operator operator-center play-state">
                            <img src="./pause_song.svg" v-show="!this.playing"  @click.stop.prevent="togglePlaying">
                            <img src="./plays_song.svg" v-show="this.playing"  @click.stop.prevent="togglePlaying">
                    </div>
                </div>
                <div class="control-list">
                    <img src="./playlsit.svg" width="28" height="28">
                </div>
            </div>
        </transition>
        <audio ref="Audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {playMode} from '../../config'

    import ProgressBar from '../../base/progressbar/progressbar'

    export default {
        components: {
            ProgressBar,
        },
        data () {
            return {
                songReady: false,
                currentTime: 0,
                playMode: 0,
            }
        },
        methods: {
            playerBack () {
                this.setFullScreen(false)
            },
            playerOpen () {
                this.setFullScreen(true)
            },
            togglePlaying () {
                if (!this.songReady) {
                    return
                }
                this.setPlayingState(!this.playing)  
            },
            // 播放上一首歌曲
            prevSong () {
                if (!this.songReady) {
                    return
                }
                let index = this.currentIndex + 1
                if (index === this.playlist.length) {
                    index = 0
                }
                this.setCurrentIndex(index)
                // 如果点击上/下 一首时为 暂停状态 点击后改为播放状态
                if (!this.playing) {
                    this.togglePlaying()
                }
                this.songReady = false
            },
            // 播放下一首歌曲
            nextSong () {
                if (!this.songReady) {
                    return
                }
                let index = this.currentIndex - 1
                if (index === -1) {
                    index = this.playlist.length - 1
                }
                this.setCurrentIndex(index)
                if (!this.playing) {
                    this.togglePlaying()
                }
                this.songReady = false
            },
            ready () {
                this.songReady = true
            },
            error () {
                this.songReady = true
            },
            disableTouch () {
                return this.songReady ? '' : 'disable'
            },
            updateTime (e) {
                // 读取当前播放的时间,修改其来修改播放进度
                this.currentTime = e.target.currentTime
            },
            // 处理获取到的当前播放时间
            formatTime (interval) {
                interval = interval | 0
                const minute = interval / 60 | 0
                const second = this._padZero(interval % 60)
                return `${minute}:${second}`
            },
            onPercentChange (percent) {
                this.$refs.Audio.currentTime = this.currentSong.duration * percent
                if (!this.playing) {
                    this.togglePlaying()
                }
            },
            changeMode () {
                const mode = (this.mode + 1) % 3
                this.setPlayMode(mode)
            },
            // 为播放时间的秒 补零
            _padZero (num, n = 2) {
                let len = num.toString().length
                while (len < n) {
                    num = '0' + num
                    len++
                }
                return num
            },
            ...mapMutations ({
                //通过mutations 修改是否全屏
                setFullScreen: 'Set_Full_Screen',
                // 播放状态
                setPlayingState: 'Set_Playing_State',
                //  当前歌曲的 index
                setCurrentIndex: 'Set_Current_Index',
                // 修改播放模式
                setPlayMode: 'Set_Play_Mode'
            }),
            
        },
        computed: {
            ...mapGetters ([
                'fullscreen',
                'playlist',
                'playing',
                'currentSong',
                'currentIndex',
                'playmode',
            ]),
            cdPlay () {
                // 播放状态为 true 时 添加play 类的样式 否则添加 play pause 类的 样式
                return this.playing ? 'play' : 'play pause'
            },
            playsPercent () {
                return this.currentTime / this.currentSong.duration
            }
        },
        watch: {
            currentSong () {
                // 播放选择 的歌曲
                this.$nextTick(() => { 
                    this.$refs.Audio.play()
                }, 20)
            },
            playing (playingState) {
                // 控制 歌曲播放暂停
                const audio = this.$refs.Audio
                this.$nextTick(() => {
                    playingState ? audio.play() : audio.pause()
                }, 20)                
            }
        }
    }
</script>

<style>
    .main-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: #909090;
    }
    .bac-image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
    }
    .player-top {
        position: relative;
        margin-bottom: 25px;
    }
    .player-back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
    }
    .icon-back {
        display: block;
        padding: 9px;
        font-size: 18px;
        color: #e9e9e9;
        transform: rotate(-90deg);
    }
    .player-Song_name {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
    }
    .player-Singer_name {
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color: #808080;
    }
    .player-middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
    }
    .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
    }
    .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        height: 100%;
    }
    .cd {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 10px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }
    .cd img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .player-bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
    }
    .player-progress {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
    }
    .play-time {
        color: #fff;
        font-size: 12px;
        flex: 0 0 30px;
        line-height: 30px;
        width: 30px;
    }
    .play-timeL {
        text-align: left;
    }
    .play-timeR {
        text-align: right;
    }
    .progress-wrapper {
        flex: 1;
    }
    .operators {
        display: flex;
        align-items: center;
    }
    .operator {
        flex: 1;
    }
    .operator-left {
        text-align: right;
    }
    .operator-center {
        padding: 0 20px;
        text-align: center;
    }
    .operator-right {
        text-align: left;
    }
    .mainPlayer-enter-active, .mainPlayer-leave-active {
        transition: all 0.4s;
    }
    .mainPlayer-enter, .mainPlayer-leave-to {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        opacity: 0;
    }
    .mini-player {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
        background: #909090;
    }
    .mini-icon {
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
    }
    .mini-icon img {
        border-radius: 50%;
    }
    .mini-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
    }
    .mini-Song_name {
        margin-bottom: 2px;
        font-size: 14px;
        color: #bcbcbc;
    }
    .mini-Singer_name {
        font-size: 10px;
        color: rgba(195, 195, 195, 0.4);
    }
    .player-top, .player-bottom {
        transition: all 0.4s;
    }
    .miniPlayer-enter-active，.miniPlayer-leave-active {
        transition: all 0.4s; 
        opacity: 0;
    }
    .control-list {
        margin-right: 24px;
    }
    /* cd旋转效果 */
    .play {
        animation: rotate 20s linear infinite;
    }
    .pause {
        animation-play-state: paused;
    }
    @keyframes rotate {
        0% { transform: rotate(0) }
        100% { transform: rotate(360deg) }
    }
    .disable {
        opacity: 0.1;
    }
</style>
