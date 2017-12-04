<template>
    <transition name="userFade">
       <div class="usercenter" ref="userCenter">
            <div class="user-switch">
                <p class="switch-fav" @click.stop="showFav">我的最爱</p>
                <p class="switch-play" @click.stop="showPlay">曾经鉴赏</p>
            </div>
            <div class="user-play iconfont" @click="randomplay">
                <i class="icon-bofang"></i>
                <span class="random-play">随机播放全部</span>
            </div>
            <scroll ref="scroll" :refreshTime="refreshTime" class="fav-list" :data="favoritelist" v-show="showFavList">
                <song-list class="list_1" :songs="favoritelist" @select="selectSong"></song-list>
            </scroll>
            <scroll ref="scroll" :refreshTime="refreshTime" class="play-list" :data="searchHistory" v-show="showPlayList">                      
                <song-list class="list_1" :songs="playHistory" @select="selectSong"></song-list>            
            </scroll>
            <div class="noresult" v-show="whoNoresult">
                <no-result :title="noresult_content"></no-result>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {insertSong} from '../../store/actions'
    import {playMixin} from '../../js/mixin'

    import Scroll from '../../base/scroll/scroll'
    import SongList from '../../base/song-list/song-list'
    import Song from '../../js/song'
    import NoResult from '../../base/no-result/no-result'
    export default {
        mixins: [playMixin],
        data () {
            return {
                showFavList: true,
                showPlayList: false,
                refreshTime: 220,
            }
        },
        components: {
            Scroll,
            SongList,
            NoResult,
        },
        methods: {
            handlePlaylist (playlist) {
                let UserBottom = playlist.length > 0 ? '60px' : ''
                this.$refs.scroll.$el.style.bottom = UserBottom
                this.$refs.scroll.refresh()
            },
            randomplay () {
                if (!this.playHistory.length || !this.favoritelist.length) {
                    return 
                }
                let list = this.showFavList ? this.favoritelist : this.playHistory
                list = list.map((song) => {
                    return new Song(song)
                })
                this.randomPlay({
                    list
                })
            },
            showFav () {
                this.showFavList = true
                this.showPlayList = false
                setTimeout(() => {
                    this.$refs.scroll.refresh()
                }, 300)
                
            },
            showPlay () {
                this.showFavList = false
                this.showPlayList = true
                setTimeout(() => {
                    this.$refs.scroll.refresh()
                }, 300)
            },
            userBack () {
                this.$router.back()
            },
            selectSong (song) {
                this.insertSong(new Song(song))
            },
            ...mapActions([
                'insertSong',
                'randomPlay'
            ])
        },
        computed: {
            whoNoresult () {
                if (this.showFavList) {
                    return !this.favoritelist.length
                }
                if (this.showPlayList) {
                    return !this.playHistory.length
                }
            },
            noresult_content () {
                if (this.showFavList) {
                    return "暂无收藏"
                }
                if (this.showPlayList) {
                    return "暂无播放"
                }
            },
            ...mapGetters([
                'favoritelist',
                'playHistory',
                'playlist'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @import '../player/play-icon_font/iconfont.css';
    @import '../../sass/style.scss';
    .userFade-enter-active, .userFade-leave-active {
        transition: all 0.3s
    }
    .userFade-enter, .userFade-leave-to {
        transform: translateY(100%);
    }
    .usercenter {
        width: 100%;
        position: relative;
        top: 0;
        bottom: 0;
        .user-switch {
            display: flex;
            text-align: center;
            color: $color-text-title;
            margin-top: 1.5rem;
            font-size: $font-size-x;
            .switch-fav {
                flex: 1;
            }
            .switch-play {
                flex: 1;
            }   
        }
        .user-play {
            text-align: center;
            font-size: $font-size-b;
            margin: 1rem 0;
            color: $color-text-title;
            .icon-bofang {
                
            }
            .random-play {
                font-weight: $font-weight-s;        
            }
        }
        .fav-list {
            position: fixed;
            top: 12rem;
            bottom: 0;
            width: 100%;
            overflow: hidden;
        }
        .play-list {
            position: fixed;
            top: 12rem;
            bottom: 2px;
            width: 100%;
            overflow: hidden;
        }
    }
</style>
