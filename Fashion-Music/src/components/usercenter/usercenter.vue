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
            <div class="user-list" ref="userList">
                <div ref="FavList" class="favorite-list"  v-show="showFavList">
                    <scroll ref="scroll" class="scroll" :data="favoritelist">
                        <div>
                            <song-list class="list_1" :songs="favoritelist" @select="selectSong"></song-list>
                        </div>
                    </scroll>
                </div>      
                <div ref="PlayList" class="play-list" v-show="showPlayList"> 
                    <scroll ref="scroll" class="scroll" :data="searchHistory"> 
                        <div>                  
                            <song-list class="list_1" :songs="playHistory" @select="selectSong"></song-list>
                        </div>  
                    </scroll>
                </div>   
            </div>
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
            }
        },
        components: {
            Scroll,
            SongList,
            NoResult,
        },
        methods: {
            handlePlaylist (playlist) {
                this.$refs.scroll.refresh()
                let UserBottom = playlist.length > 0 ? '60px' : ''
                this.$refs.userList.style.bottom = UserBottom
                this.$refs.scroll.refresh()
            },
            randomplay () {
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
                this.$refs.scroll.refresh()
            },
            showPlay () {
                this.showFavList = false
                this.showPlayList = true
                this.$refs.scroll.refresh()
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
        transition: all 0.1s
    }
    .userFade-enter, .userFade-leave-to {
        transform: translateY(100%);
    }
    .usercenter {
        height: 100%;
        overflow: hidden;
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
        .user-list {
            height: 100%;
            overflow: hidden;
            .favorite-list {
                overflow: hidden;
                height: 100%;
                .list_1 {

                }
            }
        }
        .noresult {

        }
    }




















    /* .usercenter {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        text-align: center;
        background: #408080;
    }
    .user-switch {
        display: flex;
    }
    .switch-fav, .switch-play {
        position: absolute;
        top: 1rem;
    }
    .switch-fav {
        flex: 1;       
        left: 7rem;
    }
    .switch-play {
        right: 7rem;
    }
    .user-play {
        position: absolute;
        top: 3.5rem;
        left: 5rem;
        border: 1px solid #ff0000;
        border-radius: 16px;
        padding: 4px 12px;
        margin: 4px auto;
        width: 180px;
    }
    .icon-bofang {
        font-size: 18px;
    }
    .random-play {
        font-size: 18px;
    }
    .user-list {
        overflow: hidden;
        height: 100%;
        width: 100%;
        top: 5rem;
    }
    .favorite-list, .play-list, .scroll {       
        position: fixed;
        overflow: hidden;
        top: 13.5rem;
        left: 0;
        height: 100%;
        width: 100%
    }
    .scroll > div {
        margin-left: -20rem;
    } */
</style>
