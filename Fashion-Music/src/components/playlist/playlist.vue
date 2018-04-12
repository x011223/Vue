<template>
    <transition name="playlist">
        <div class="playlist" v-show="playlistShow" @click.stop="hidePlayList">
            <!-- <div class="fuceng" @click.stop="hidePlayList"></div> -->
            <div class="diceng">
                <div class="operator" @click.stop>
                    <div class="playmode iconfont">
                        <i class="icon" :class="iconMode" @click="changeMode"></i>
                        <span class="text">{{modeTEXT}}</span>
                        <div class="operatorImg">
                            <!-- <img src="./clear.svg" @click.stop="showConfirm" class="clear" width="22" height="22"> -->
                            <span class="clear" @click.stop="showConfirm">清除</span>
                            <!-- <img src="./down.svg" @click.stop="hidePlayList" class="down" width="22" height="22"> -->
                            <span class="down" @click.stop="hidePlayList">下落</span>
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
                                    <!-- <img class="icon-delete" @click.stop="deleteSong(song)" src="./delete.svg" width="14" height="14"> -->
                                    <span class="icon-delete" @click.stop="deleteSong(song)">删除</span>
                                </div>
                            </li>
                        </transition-group>
                    </scroll>
                    <div class="addsong" @click.stop>
                        <span class="add-text" @click="showAddSong">添加歌曲</span> 
                    </div>
                </div>       
                <confirm text="确定清空播放列表？" btnConfirm="清空" ref="confirm" @confirmConfirm="clearList"></confirm>
                <add-song ref="Addsong"></add-song>
            </div>
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

<style lang="scss" scoped>
    // @import '../player/play-icon_font/iconfont.css'; 
    @import '../../sass/style.scss';
    * {
        margin: 0;
        padding: 0;
    }
    .playlist {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 60px;
        z-index: 200;
        background: $background-color-fuceng;
        .diceng {
            position: absolute;
            left: 0;
            bottom: 0;
            max-height: 330px;
            width: 100%;
            .operator {       
                height: 40px;
                line-height: 40px;
                padding-left: 12px;
                background: #f0f0f0;
                border-bottom: 1px solid #8080c0;
                .iconfont {
                    color: #5e5e5e;
                }
                .playmode {        
                    position: relative;
                    .icon {
                        display: inline-block;
                        position: absolute;
                        line-height: 40px;
                    }
                    .text {
                        display: inline-block;
                        position: absolute;
                        font-size: $font-size-b;
                        left: $height-big-x;
                        line-height: $height-big-x;
                    }
                    .operatorImg {
                        position: absolute;
                        padding-top: 0.5rem;
                        right: 20px;
                        .clear {
                            display: inline-block;
                            position: absolute;
                            right: 2.5rem;
                        } 
                        .down {
                            display: inline-block;
                            position: absolute;
                            right: 0;
                        } 
                    }
                }
            }
            .songlist { 
                background: #f0f0f0;
                margin-bottom: 2rem;
                .list {
                    height: 240px;
                    overflow: hidden;
                    max-height: 360px;
                    background: $background-color-list;
                    .songList {
                        height: 30px;
                        left: 24px;
                        position: relative;
                        overflow: hidden;               
                        .icons {
                            display: inline-block;
                            position: absolute;
                            right: 40px;
                            .iconplay {
                                left: 8px;
                                width: 12px;
                            } 
                            .icon-zanting, .icon-fav_off, .icon-fav_on {
                                font-size: 16px;
                                color: $color-text-title;
                            }
                            .icon-delete {
                                display: inline-block;
                            }
                        }
                        .song-name {
                            font-size: 16px;
                            color: $color-text-name;
                            right: 0;
                        }
                    }
                }
                .addsong {
                    position: relative;
                    height: 40px;
                    line-height: 40px;
                    margin-bottom: -1rem;    
                    font-size: 16px;
                    padding-top: 0.5rem;
                    text-align: center; 
                    background: $background-color-compare;
                    .add-text {
                        padding: 4px 12px;
                        border: 1px solid #aeaeae;
                        border-radius: 60px;
                        color: #ababab;
                    }         
                }    
            }
        }
    }                 
    .playlist-enter-active, .playlist-leave-active {
        transition: all 0.3s ease-in
    }
    .playlist-enter, .playlist-leave-to {
        transform: translate3d(0, 100%, 0)
    }
    .delete_song-enter-active, .delete_song-leave-active {
        transition: all 0.3s linear;
    }
    .delete_song-enter, .delete_song-leave-to {
        transform: translateY(-1000%)
    }
</style>
