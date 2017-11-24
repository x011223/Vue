<template>
    <transition name="playlist">
        <div class="playlist" v-show="playlistShow">
            <div class="operator">
                <div class="playmode iconfont">
                    <i class="icon" :class="iconMode" @click="changeMode"></i>
                    <span class="text">{{modeTEXT}}</span>
                    <div class="operatorImg">
                        <img src="./clear.svg" @click.stop="showConfirm" class="clear" width="22" height="22">
                        <img src="./down.svg" @click.stop="hidePlayList" class="back" width="24" height="24">
                    </div>
                </div>
            </div>
            <div class="songlist">
                <scroll class="list" ref="listContent" :data="sequenceList">
                    <transition-group name="delete_song" tag="ul">
                        <li :key="song.id" ref="listItem" v-for="(song, index) in sequenceList" @click.stop="selectSong(song, index)" class="songList iconfont">                       
                            <span class="song-name">{{song.name}}</span>
                            <div class="icons">
                                <i class="iconplay" :class="currentIcon(song)"></i>
                                <i :class="iconFav(song)" @click.stop="toggleFavorite(song)"></i>
                                <img class="icon-delete" @click.stop="deleteSong(song)" src="./delete.svg" width="14" height="14">
                            </div>
                        </li>
                    </transition-group>
                </scroll>
                <div class="addsong">
                    <span class="add-text" @click="showAddSong">添加歌曲</span> 
                </div>
            </div>       
            <div class="close" @click="hidePlayList">
                <p>关闭</p>
            </div>
            <confirm text="确定清空播放列表？" btnConfirm="清空" ref="confirm" @confirmConfirm="clearList"></confirm>
            <add-song ref="Addsong"></add-song>
        </div>       
    </transition>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import {playMode} from '../../js/config'
    import {playerMixin} from '../../js/mixin'

    import Scroll from '../../base/scroll/scroll'
    import Confirm from '../../base/confirm/confirm'
    import AddSong from '../addsong/addsong'
    export default {
        mixins: [playerMixin],
        components: {
            Scroll,
            Confirm,
            AddSong,
        },
        data () {
            return {
                playlistShow: false,
                playMode: 0,
                isLoop: false,
                currentIconShow: false,            
            }
        },
        methods: {
            currentIcon (song) {
                if (this.currentSong.id === song.id) {
                    return 'icon-zanting'
                }
                return ''
            },
            showAddSong () {
                this.$refs.Addsong.addShow()
            },
            showPlayList () {
                this.playlistShow = true                
                setTimeout(() => {
                    this.$refs.listContent.refresh()
                    this.JumpCurrentSong(this.currentSong)
                }, 20);
            }, 
            hidePlayList () {
                this.playlistShow = false
            },
            selectSong (song, index) {
                if (this.playmode === playMode.random) {
                    index = this.playlist.findIndex((item) => {
                        return song.id === item.id
                    })
                }
                this.setCurrentIndex(index)      
                if (!this.playlist.length) {
                    this.setPlayingState(false)
                } else {
                    this.setPlayingState(true)
                }                        
            },
            deleteSong (song) {
                console.log("1")
                this.deleteSongs(song) 
                if (!this.playlist.length) {                
                    this.hidePlayList()
                }
            }, 
            showConfirm () {
                this.$refs.confirm.confirmShow()
            },
            clearList () {
                this.clearSong()
                this.hidePlayList()
            },
            JumpCurrentSong (current) {
                this.fullscreen = true
                const index = this.sequenceList.findIndex((song) => {
                    return current.id === song.id
                })
                if (index > 3) {
                    this.$refs.listContent.scrollToElement(this.$refs.listItem[index-3], 50)
                }
                else {
                    this.$refs.listContent.scrollTo(0, 0, 500)
                }
            },
            ...mapMutations({
                setPlayMode: 'Set_Play_Mode',
                setCurrentIndex: 'Set_Current_Index',
                setPlayingState: 'Set_Playing_State',
            }),
            ...mapActions([
                'deleteSongs',
                'clearSong',
            ])
        },
        watch: {
            currentSong (newSong, oldSong) {
                if (newSong.id === oldSong.id || !this.playlistShow) {
                    return
                }
                this.JumpCurrentSong(newSong)
            },
        },
        computed: {
            ...mapGetters([
                'playmode',
                'playing',
                'sequenceList',
                'currentSong',
                'playlist',
                'fullscreen'
            ]),
            modeTEXT () {
                return this.playmode === playMode.random ? "随机播放" : this.playmode === playMode.sequence ? "顺序播放" : "单曲循环"
            }
        }, 
    }
</script>

<style scoped>
    @import '../player/play-icon_font/iconfont.css'; 
    * {
        margin: 0;
        padding: 0;
    }
    .playlist {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 200;
        background: #f0f0f0;
    }
    .operator {       
        height: 40px;
        line-height: 40px;
        padding-left: 12px;
        border-bottom: 1px solid #8080c0;
    }
    .playmode {        
        position: relative;
    }
    .playmode > .icon {
        display: inline-block;
        position: absolute;
        line-height: 40px;
    }
    .playmode > .text {
        display: inline-block;
        position: absolute;
        font-size: 16px;
        left: 42px;
        line-height: 40px;
    }
    .playmode > .clear {
        display: inline-block;
        position: absolute;
        right: 0;
    }
    .operatorImg {
        position: absolute;
        top: 0;
        right: 20px;
    }
    .songlist {
        height: 240px;
        overflow: hidden;
        background: #f0f0f0;
    }
    .list {
        height: 200px;
        overflow: hidden;
    }
    .delete_song-enter-active, .delete_song-leave-active {
        transition: all 0.1s linear;
    }
    .delete_song-enter, .delete_song-leave-to {
        transform: translateY(-1000%)
    }
    .songList {
        height: 30px;
        left: 24px;
        position: relative;
        overflow: hidden;
    }
    .iconplay {
        left: 8px;
        width: 12px;
    }
    .icons {
        display: inline-block;
        position: absolute;
        right: 40px;
    }
    .iconfont {
        color: #5e5e5e;
    }
    .song-name {
        font-size: 16px;
        color: rgba(7, 17, 27, 0.5);
        right: 0;
    }
    .icon-zanting {
        font-size: 16px;
    }
    .icon-fav_off, .icon-fav_on {
        font-size: 16px;
    }
    .icon-delete {
        display: inline-block;
    }
    .addsong {
        position: relative;
        height: 40px;
        line-height: 40px;
        bottom: 4px;     
        font-size: 16px;
        text-align: center;       
    }
    .add-text {
        padding: 4px 12px;
        border: 1px solid #aeaeae;
        border-radius: 60px;
        color: #ababab;
    }
    .close {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        background: #0080ff;
    }
    .playlist-enter-active, .playlist-leave-active {
        transition: all 0.1s ease-in
    }
    .playlist-enter, .playlist-leave-to {
        transform: translate3d(0, 100%, 0)
    }
</style>
