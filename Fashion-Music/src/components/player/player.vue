<template>
    <div class="player" v-show="playlist.length > 0">
        <transition name="mainPlayer">
            <div class="main-player" v-show="fullscreen">
                <div class="bac-image">
                    <img :src="currentSong.image" width="100%" height="100%">
                </div>
                <div class="player-top">
                    <div class="player-back" @click="playerBack">
                        <img class="icon-back" src="../music-list/back.svg" width="24" height="24">
                    </div>
                    <h1 class="player-Song_name" v-html="currentSong.name"></h1>
                    <h2 class="player-Singer_name" v-html="currentSong.singer"></h2>
                </div>
                <div class="player-middle" 
                     @touchstart.prevent="middleTouchStart"
                     @touchmove.prevent="middleTouchMove"
                     @touchend="middleTouchEnd">
                    <div class="middle-l" ref="middleL">
                        <div class="cd-wrapper">
                            <div class="cd" :class="cdPlay">
                                <img class="cd-image" :src="currentSong.image">
                            </div>
                        </div>
                        <div class="ly-wrapper">
                            <div class="cd-lyric">{{cdplayLyric}}</div>
                        </div>
                    </div>
                    <scroll class="middle-r" ref="lyricWrapper" :data="currentLyric && currentLyric.lines"> 
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p class="lyric-text"
                                   :class="{'lyricCurrent' : currentLyricLine === index}" 
                                   ref="lyricText" 
                                   v-for="(line, index) in currentLyric.lines">{{line.txt}}</p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <div class="player-bottom" enter-active-class="bottomEnter">
                    <div class="dot-wrapper">
                        <span class="dot" :class="{'dotActive' : currentDot === 'cd'}"></span>
                        <span class="dot" :class="{'dotActive' : currentDot === 'lyric'}"></span>
                    </div>
                    <div class="player-progress">
                        <span class="play-time play-timeL">{{formatTime(currentTime)}}</span>
                        <div class="progress-wrapper">
                            <progress-bar :playsPercent="playsPercent" @percentChange="onPercentChange"></progress-bar>
                        </div>
                        <span class="play-time play-timeR">{{formatTime(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="operator operator-left iconfont" @click="changeMode">
                            <i :class="iconMode"></i>
                        </div>
                        <div class="operator operator-left iconfont" :class="disableTouch">
                            <i @click="prevSong" class="icon-prev"></i>
                        </div>
                        <div class="operator operator-center iconfont" :class="disableTouch">
                            <i :class="playIcon" @click.stop.prevent="togglePlaying"></i>
                        </div>
                        <div class="operator operator-right iconfont" :class="disableTouch">
                            <i @click="nextSong" class="icon-next"></i>
                        </div>
                        <div class="operator operator-right iconfont">
                            <i class="icon-fav_off"></i>
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
                    <div class="operator operator-center iconfont">
                        <i :class="playIcon" @click.stop.prevent="togglePlaying"></i>
                    </div>
                </div>
                <div class="control-list iconfont">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio ref="Audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="nextSong" :loop="isLoop"></audio>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {playMode} from '../../config'
    import {shuffle} from "../../random"
    import {prefixStyle} from '../../dom'

    import ProgressBar from '../../base/progressbar/progressbar'
    import Lyric from 'lyric-parser'
    import Scroll from '../../base/scroll/scroll'

    const transform = prefixStyle('transform')
    const transitionDuration = prefixStyle('transitionDuration')

    export default {
        components: {
            ProgressBar,
            Scroll,
        },
        data () {
            return {
                // 当前歌曲是否准备完毕
                songReady: false,
                currentTime: 0,
                playMode: 0,
                // 是否循环
                isLoop: false,
                // 当前的歌词
                currentLyric: null,
                // 当前歌词所在行
                currentLyricLine: 0,
                currentDot: 'cd',
                cdplayLyric: ''
            }
        },
        created () {
            this.touch = {}
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
                // 歌曲暂停时停止歌词滚动
                if (this.currentLyric) {
                    this.currentLyric.stop()
                }
                this.setPlayingState(!this.playing)  
            },
            // 播放下一首歌曲
            nextSong () {
                if (!this.songReady) {
                    return
                }
                if (this.playlist.length === 1) {
                    this.isLoop = true
                } else {
                    let index = this.currentIndex + 1
                    if (index === this.playlist.length) {
                        index = 0
                    }
                    this.setCurrentIndex(index)
                    // 如果点击上/下 一首时为 暂停状态 点击后改为播放状态
                    if (!this.playing) {
                        this.togglePlaying()
                    }
                }
                this.songReady = false
            },
            // 播放上一首歌曲
            prevSong () {
                if (!this.songReady) {
                    return
                }
                if (this.playlist.length === 1) {
                    this.isLoop = true
                } else {
                    let index = this.currentIndex - 1
                    if (index === -1) {
                        index = this.playlist.length - 1
                    }
                    this.setCurrentIndex(index)
                    if (!this.playing) {
                        this.togglePlaying()
                    }
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
                // interval = interval | 0
                // const minute = interval / 60 | 0
                interval = Math.floor(interval)
                const minute = Math.floor(interval / 60)
                const second = this._padZero(interval % 60)
                return `${minute}:${second}`
            },
            // 播放进度改变时
            onPercentChange (percent) {
                const currentTime = this.currentSong.duration * percent
                this.$refs.Audio.currentTime = currentTime
                if (!this.playing) {
                    this.togglePlaying()
                }
                // 拖动进度条时，歌词滚动到达相应位置
                if (this.currentLyric) {
                    this.currentLyric.seek(currentTime * 1000)
                }
            },
            changeMode () {
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
                    console.log("123")
                }
                this.resetCurrent(list)
                this.setPlayList(list)
            },
            // 使当前播放的歌曲index不变
            resetCurrent (list) {
                // let index = list.findIndex((item) => {
                //     return item.id === this.currentSong.id
                // })
                // findIndex ES6 语法
                let index = list.findIndex(item => item.id === this.currentSong.id)
                this.setCurrentIndex(index)
            },
            // 获得处理后的歌词
            getLyrics () {
                this.currentSong.getLyrics().then((lyric) => {
                    this.currentLyric = new Lyric(lyric, this.lyricHandle) 
                    if (this.playing) {
                        // 使歌词滚动
                        this.currentLyric.play()
                    }        
                }).catch(() => {
                    // 获取不到歌词时
                    this.currentLyric = null
                    this.cdplayLyric = ''
                    this.currentLyricLine = 0
                })
            },
            lyricHandle ({lineNum, txt}) {
                this.currentLyricLine = lineNum
                if (lineNum > 5) {
                    // 当前播放歌词位置不变化，已播放向上滚动
                    let lyricLine = this.$refs.lyricText[lineNum - 5]
                    this.$refs.lyricWrapper.scrollToElement(lyricLine, 500) 
                } else {
                    this.$refs.lyricWrapper.scrollTo(0, 0, 500) 
                }
                this.cdplayLyric = txt
            },
            middleTouchStart (e) {
                this.touch.initiated = true
                // this.touch.moved = false
                const touch = e.touches[0]
                this.touch.startX = touch.pageX
                this.touch.startY = touch.pageY
            },
            middleTouchMove (e) {
                if (!this.touch.initiated) {
                    return
                }
                const touch = e.touches[0]
                const deltaX = touch.pageX - this.touch.startX
                const deltaY = touch.pageY - this.touch.startY
                // 如果Y方向滚动比X方向大，不做操作
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    return 
                }
                const Lyricleft = this.currentDot === 'cd' ? 0 : -window.innerWidth
                // 左滑距离
                const LyricWidth = Math.min(0, Math.max(-window.innerWidth, Lyricleft + deltaX))
                this.touch.percent = Math.abs(LyricWidth / window.innerWidth)
                this.$refs.lyricWrapper.$el.style[transform] = `translate3d(${LyricWidth}px, 0, 0)` 
                const time = 300 
                this.$refs.lyricWrapper.$el.style[transitionDuration] = `${time}ms`
                this.$refs.middleL.style.opacity = 1 - this.touch.percent
                this.$refs.middleL.style[transitionDuration] = 0
            },
            middleTouchEnd () {
                let LyricWidth
                let opacity
                if (this.currentDot === 'cd') {
                    // 向左滑动，切换到cd
                    if (this.touch.percent > 0.1) {
                        LyricWidth = -window.innerWidth
                        opacity = 0
                        this.currentDot = 'lyric'
                        this.touch.deltaX = 0
                    } else {
                        LyricWidth = 0
                        opacity = 1
                        this.touch.deltaX = 0
                    }
                } else {
                    // 向右滑动，切换到歌词
                    if (this.touch.percent < 0.9) {
                        LyricWidth = 0
                        this.currentDot = 'cd'
                        opacity = 1
                        this.touch.deltaX = 0
                    } else {
                        LyricWidth = -window.innerWidth
                        opacity = 0
                        this.touch.deltaX = 0
                    }
                }
                this.$refs.lyricWrapper.$el.style[transform] = `translate3d(${LyricWidth}px, 0, 0)`
                const time = 300
                this.$refs.lyricWrapper.$el.style[transitionDuration] = `${time}ms`
                this.$refs.middleL.style.opcity = 1 - this.touch.percent
                this.$refs.middleL.style[transitionDuration] = 0
                this.$refs.middleL.style.opacity = opacity
                this.$refs.middleL.style[transitionDuration] = 0              
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
                setPlayMode: 'Set_Play_Mode',
                setPlayList: 'Set_Play_List',
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
                'sequenceList',
            ]),
            cdPlay () {
                // 播放状态为 true 时 添加play 类的样式 否则添加 play pause 类的 样式
                return this.playing ? 'play' : 'play pause'
            },
            // 播放百分比
            playsPercent () {
                return this.currentTime / this.currentSong.duration
            },
            // 播放暂停样式图标
            playIcon () {
                return this.playing ? 'icon-zanting' : 'icon-bofang'
            },
            // 播放模式图标
            iconMode () {
                return this.playmode === playMode.sequence ? 'icon-sequ' : this.playmode === playMode.loop ? 'icon-loop' : 'icon-random'
            }
        },
        watch: {
            currentSong (newSong, oldSong) {
                // 当前歌曲ID不变化,不执行任何操作
                if (newSong.id === oldSong.id) {
                    return
                }
                // 歌曲切换时停止上一首歌的歌词滚动
                if (this.currentLyric) {
                    this.currentLyric.stop()
                }
                // 播放选择 的歌曲
                setTimeout(() => { 
                    this.$refs.Audio.play()
                    this.getLyrics()
                }, 120)
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

<style scoped>
    @import './play-icon_font/iconfont.css';
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
    .ly-wrapper {
        width: 80%;
        margin: 30px auto 0 auto;
        overflow: hidden;
        text-align: center;
    }
    .cd-lyric {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        /* color: rgba(255, 255, 255, 0.5); */
        color: #fff;
    }
    .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .lyric-wrapper {
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        text-align: center;
    }
    .lyric-text {
        line-height: 32px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
    }
    .lyricCurrent {
        color: #fff;
    }
    .player-bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
    }
    .dot-wrapper {
        text-align: center;
        font-size: 0;
    }
    .dot {
        display: inline-block;
        vertical-align: middle;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
    }
    .dotActive {
        width: 20px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.8);
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
