<template>
    <div class="music-list">
        <div class="back" @click="_back">
            <img class="icon-back" src="./back.svg" width="16" height="16">
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper" ref="playWrapper">
                <div class="btn_play" @click="randomPlayAll">
                    <img src="./play.svg" class="play-icon" width="24" height="24">
                    <span class="play-text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="layer" ref="layer">

        </div>
        <scroll @scroll="scroll" class="songs" :data="songs" ref="songList" :probe-type="probeType" :listen-scroll="listenScroll">
            <div class="songList-wrapper">
                <song-list :rank-style="rankStyle" @select="selectSong" :songs="songs"></song-list>
            </div>
            <div class="loading" v-show="!songs.length">
                <loading></loading>
            </div>
        </scroll>      
    </div>
</template>

<script>
    import Scroll from '../../base/scroll/scroll.vue'
    import SongList from '../../base/song-list/song-list.vue'
    import Loading from '../../base/loading/loading.vue'

    import {prefixStyle} from '../../js/dom'
    import {mapActions} from 'vuex'
    import {playMixin} from '../../js/mixin'

    const Header_Height = 40
    const transform = prefixStyle('transform')
    const backdrop = prefixStyle('backdrop')

    export default {
        mixins: [playMixin],
        components: {
            Scroll,
            SongList,
            Loading,
        },
        created () {
            this.probeType = 3
            this.listenScroll = true
        },
        data () {
            return {
                scrollY: 0
            }          
        },
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            },
            rankStyle: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            bgStyle () {
                return `background-image: url(${this.bgImage})`
            }
        },
        methods: {
            handlePlaylist (playlist) {
                const listBottom = playlist.length > 0 ? '60px' : ''
                this.$refs.songList.$el.style.bottom = listBottom
                this.$refs.songList.refresh()
            },
            selectSong (song, index) {
                this.selectPlay({
                    list: this.songs,
                    index
                })
            },
            scroll (pos) {
                // 得到实时滚动的距离
                this.scrollY = pos.y
            },
            randomPlayAll () {
                this.randomPlay({
                    list: this.songs
                })
            },
            _back () {
                // 以下 2 种方法都可以
                this.$router.back()
                // this.$router.push({path: '/singer'})
            },
            ...mapActions ([
                'selectPlay',
                'randomPlay'
            ])
        },
        mounted () {
            this.imageHeight = this.$refs.bgImage.clientHeight
            this.minTranslateY  = -this.imageHeight + Header_Height
            this.$refs.songList.$el.style.top = `${this.imageHeight}px`
        },
        watch: {
            scrollY (newY) {
                let translateY = Math.max(this.minTranslateY, newY)
                this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`
                // this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`
                let zIndex = 0
                // 歌手 歌列表下拉，歌手头像变动
                // 原始大小
                let scale = 1
                // 头像变动比例
                let blur = 0
                const scalePercent = Math.abs(newY / this.imageHeight)
                if (newY > 0)   {
                    scale = 1 + scalePercent
                    // 图片跟随
                    zIndex = 10
                }   else    {
                    // 图片上拉模糊
                    blur = Math.min(20 * scalePercent, 20)
                }
                this.$refs.filter.style[backdrop] = `blur(${blur}px)`
                // this.$refs.filter.style['webkitBackdrop-filter'] = `blur(${blur}px)`
                this.$refs.bgImage.style[transform] = `scale(${scale})`
                // this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
                if (newY < this.minTranslateY) {
                    zIndex = 10
                    this.$refs.bgImage.style.paddingTop = 0
                    this.$refs.bgImage.style.height = `${Header_Height}px`
                    this.$refs.playWrapper.style.display = 'none'
                }   else    {
                    this.$refs.bgImage.style.paddingTop = '70%'
                    this.$refs.bgImage.style.height = 0
                    this.$refs.playWrapper.style.display = 'block'
                }
                this.$refs.bgImage.style.zIndex = zIndex
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/style.scss';
    .music-list {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .back {
            position: absolute;
            top: 0;
            left: 3px;
            z-index: 50;
            .icon-back {
                display: block;
                padding: 12px;
                font-size: 12px;
            }
        }
        .title {
            position: absolute;
            top: 0;
            left: 10%;
            z-index: 40;
            width: 80%;
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: $background-color-title;
        }
        .bg-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
            background-image: no-repeat;
            .play-wrapper {
                position: absolute;
                bottom: 20px;
                z-index: 50;
                width: 100%;               
                .btn_play {
                    box-sizing: border-box;
                    width: 160px;
                    padding: 7px 0;
                    margin: 0 auto;
                    text-align: center;
                    border-radius: 100px;
                    font-size: 0;
                    border: 1px solid rgb(254, 224, 18);
                    .play-icon {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 8px;
                        font-size: 16px;
                    }
                    .play-text {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 16px;
                        color: #ffff00;
                    }
                }
            }
        }
        .layer {
            position: relative;
            height: 100%;
            background: rgb(255, 255, 255);
        }
        .songs {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            background: rgb(255, 255, 255);
            .songList-wrapper {
                // margin-top: $height-small;
                width: 100%;
            }
            .loading {
                position: absolute;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
</style>


