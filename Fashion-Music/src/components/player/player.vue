<template>
    <div class="player" v-show="playlist.length > 0">
        <transition name="mainPlayer">
            <div class="main-player" v-show="fullscreen">
                <div class="bac-image">
                    <img :src="currentSong.image" width="100%" height="100%">
                </div>
                <div class="player-top">
                    <div class="player-back" @click="playerBack">
                        <!-- <img class="icon-back" src="../music-list/back.svg" width="24" height="24"> -->
                        <span class="icon-back">返回</span>
                    </div>
                    <h1 class="player-Song_name" v-html="currentSong.name"></h1>
                    <h2 class="player-Singer_name" v-html="currentSong.singer"></h2>
                </div>
                <div class="player-middle" 
                     @touchstart.prevent="middleTouchStart"
                     @touchmove.prevent="middleTouchMove"
                     @touchend="middleTouchEnd">
                    <div class="middle-l" ref="middleL">
                        <!-- 转动CD -->
                        <div class="cd-wrapper">
                            <div class="cd" :class="cdPlay">
                                <img class="cd-image" :src="currentSong.image">
                            </div>
                        </div>
                        <!-- CD下单行歌词 -->
                        <div class="ly-wrapper">
                            <div class="cd-lyric">{{cdplayLyric}}</div>
                        </div>
                    </div>
                    <!-- 歌词滚动部分 -->
                    <scroll class="middle-r" ref="lyricWrapper" :data="currentLyric && currentLyric.lines"> 
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p class="lyric-text"
                                   :class="{'lyricCurrent' : currentLyricLine === index}" 
                                   ref="lyricText" 
                                   :key="index"
                                   v-for="(line, index) in currentLyric.lines"
                                   @click.stop="JumpPlay(line.time)">{{line.txt}}</p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <!-- 底部播放操作 -->
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
                            <!-- <i :class="iconMode"></i> -->
                            <span v-html="iconMode"></span>
                        </div>
                        <div class="operator operator-left iconfont" :class="disableTouch">
                            <!-- <i @click="prevSong" class="icon-prev"></i> -->
                            <span @click="prevSong">上一曲</span>
                        </div>
                        <div class="operator operator-center iconfont" :class="disableTouch">
                            <!-- <i :class="playIcon" @click.stop.prevent="togglePlaying"></i> -->
                            <span @click="togglePlaying" v-html="playIcon"></span>
                        </div>
                        <div class="operator operator-right iconfont" :class="disableTouch">
                            <!-- <i @click="nextSong" class="icon-next"></i> -->
                            <span @click="nextSong">下一曲</span>
                        </div>
                        <div class="operator operator-right iconfont">
                            <!-- <i @click="toggleFavorite(currentSong)" :class="iconFav(currentSong)"></i> -->
                            <!-- <span @click="toggleFavorite(currentSong)" v-html="iconFav(currentSong)"></span> -->
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
                        <!-- <i :class="playIcon" @click.stop.prevent="togglePlaying"></i> -->
                        <span v-html="playIcon" @click.stop.prevent="togglePlaying"></span>
                    </div>
                </div>
                <div class="control-list iconfont">
                    <!-- <i class="icon-playlist" @click.stop="Showplaylist"></i> -->
                    <span @click.stop="Showplaylist">列表</span>
                </div>
            </div>
        </transition>
        <play-list ref="PLAYLIST"></play-list>
        <audio ref="Audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime" @ended="nextSong" :loop="isLoop"></audio>
    </div>
</template>

<script>
    import {prefixStyle} from '../../js/dom'
    import {playerMixin} from '../../js/mixin'
    import {mapActions} from 'vuex'

    import ProgressBar from '../../base/progressbar/progressbar'
    import Lyric from 'lyric-parser'
    import Scroll from '../../base/scroll/scroll'
    import PlayList from '../playlist/playlist'

    const transform = prefixStyle('transform')
    const transitionDuration = prefixStyle('transitionDuration')

    export default {
        mixins: [playerMixin],
        components: {
            ProgressBar,
            Scroll,
            PlayList,
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
            Showplaylist () {
                if (this.fullscreen) {
                    return
                } else {
                    this.$refs.PLAYLIST.showPlayList()
                }
            },
            // 点击歌词 跳转到对应位置
            JumpPlay (time) {
                this.$refs.Audio.currentTime = time / 1000
                if (!this.playing) {
                    this.togglePlaying()
                }
                this.currentLyric.seek(time)
            },
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
                    return
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
                this.SavePlayHistory(this.currentSong)
            },
            error () {
                this.songReady = true
                this.nextSong()
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
            // 获得处理后的歌词
            getLyrics () {
                this.currentSong.getLyrics().then((lyric) => {
                    if (this.currentSong.lyric !== lyric) {
                        return
                    }
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
            ...mapActions([
                'SavePlayHistory'
            ])  
        },
        computed: {
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
                // return this.playing ? 'icon-zanting' : 'icon-bofang'
                return this.playing ? '暂停' : '播放'
            },
        },
        watch: {
            currentSong (newSong, oldSong) {
                // 当前歌曲ID不变化,不执行任何操作
                if (!newSong.id) {
                    return
                }
                if (newSong.id === oldSong.id) {
                    return
                }
                // 歌曲切换时停止上一首歌的歌词滚动
                if (this.currentLyric) {
                    this.currentLyric.stop()
                    this.currentTime = 0
                    this.currentLyricLine = 0
                }
                clearTimeout(this.timer)
                // 播放选择 的歌曲
                this.timer = setTimeout(() => { 
                    this.$refs.Audio.play()
                    this.getLyrics()
                }, 1000)
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

<style lang="scss" scoped>
    // @import './play-icon_font/iconfont.css';
    @import '../../sass/style.scss';
    .top_in-enter-active, .top_in-leave-active {
        transition: all 0.1s cubic-bezier(0.37, -0.67, 0.48, 1.48)
    }
    .top_in-enter, .top_in-leave-to {
        transform: translateY(100%)
    }
    i {
        font-style: normal;
    }
    .main-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: $background-color-player;
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
            .player-back {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;
                .icon-back {
                    display: block;
                    padding: 9px;
                    font-size: $font-size-x;
                    color: $background-color-theme;
                    // 使返回图标旋转90度
                    transform: rotate(-90deg);
                }
            }
            .player-Song_name {
                width: 70%;
                margin: 0 auto;
                line-height: $height-big-x;
                text-align: center;
                font-size: $font-size-x;
                color: $background-color-warning;
            }
            .player-Singer_name {
                line-height: 20px;
                text-align: center;
                font-size: 12px;
                color: #808080;
            }
        }
        .player-middle {
            position: fixed;
            width: 100%;
            top: 80px;
            bottom: 170px;
            white-space: nowrap;
            font-size: 0;
            .middle-l {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 80%;
                .cd-wrapper {
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    height: 100%;
                    .cd {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        border: 10px solid $background-color-title;
                        border-radius: 50%;
                        img {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }   
                .ly-wrapper {
                    width: 80%;
                    margin: 30px auto 0;
                    overflow: hidden;
                    text-align: center;
                    .cd-lyric {
                        height: $height-small;
                        line-height: $height-small;
                        font-size: $font-size-b;
                        color: $background-color-compare;
                    }
                }
            }
            .middle-r {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                height: 100%;
                overflow: hidden;
                .lyric-wrapper {
                    width: 80%;
                    margin: 0 auto;
                    overflow: hidden;
                    text-align: center;
                    .lyric-text {
                        line-height: 32px;
                        color: $background-color-title-dark;
                        font-size: $font-size-b;
                    }
                    .lyricCurrent {
                        color: $background-color-compare;
                    }
                }
            }
        }
        .player-bottom {
            position: absolute;
            bottom: $height-big-xx;
            width: 100%;
            .dot-wrapper {
                text-align: center;
                font-size: 0;
                .dot {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: $background-color-title-dark;
                }
                .dotActive {
                    width: 20px;
                    border-radius: 5px;
                    background: $background-color-theme;
                }
            }
            .player-progress {
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0px auto;
                padding: 10px 0;
                .play-time {
                    color: #fff;
                    font-size: 12px;
                    flex: 0 0 30px;
                    line-height: $height-big;
                    width: $height-big;
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
            }
            .operators {
                display: flex;
                align-items: center;
                color: #f4ea2a;
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
            }
        }
    }
    .mainPlayer-enter-active, .mainPlayer-leave-active {
        transition: all 0.1s;
    }
    .mainPlayer-enter, .mainPlayer-leave-to {
        transition: all 0.1s cubic-bezier(0.86, 0.18, 0.82, 1.32);
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
        .mini-icon {
            flex: 0 0 40px;
            width: 40px;
            padding: 0 10px 0 20px;
            img {
                border-radius: 50%;
            }
        }    
        .mini-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .mini-Song_name {
                margin-bottom: 2px;
                font-size: 14px;
                color: #bcbcbc;
            }
            .mini-Singer_name {
                font-size: 10px;
                color: rgba(195, 195, 195, 0.4);
            }
        }
        .control-progress {
            .operator {
                flex: 1;
            }
            .operator-center {
                padding: 0 20px;
                text-align: center;
            }
        }
        .control-list {
            margin-right: 24px;
        }
    }
    .player-top, .player-bottom {
        transition: all 0.1s;
    }
    .miniPlayer-enter-active，.miniPlayer-leave-active {
        transition: all 0.1s; 
        opacity: 0;
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
