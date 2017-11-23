<template>
    <transition name="add_song">
        <div class="add-song" v-show="add_show">
            <div class="add-header">
                <h1 class="add-text">添加歌曲到播放列表</h1>
                <img class="add-close" @click.stop="addHide" src="./close.svg" width="20" height="20">
            </div>
            <div class="search-box">
                <search-box ref="searchBox" placeholder="寻找好听的歌曲" @inputText="onTextChange"></search-box>
            </div>
            <div class="add-bottom">
                <scroll class="serach-result" v-show="inputText">
                    <search-suggest :inputText="inputText" :showSinger="showSinger" @resultScroll="inputBlur" @searchHistory="saveSearch"></search-suggest>
                </scroll>
                <div class="history" v-show="!inputText">
                        <div class="history-text">
                            <h3 class="play-title" :class="{'active': showplayHistory === true}" @click.stop="playhistoryShow">播放记录</h3>
                            <h3 class="search-title" :class="{'active': showSearchHistory === true}" @click.stop="searchhistoryShow">搜索记录</h3>
                        </div>
                        <div class="play_history-list"  v-show="showplayHistory">
                            <scroll :refreshTime="refreshTime" ref="scroll_1" class="scroll" :data="playHistory">
                                <div>
                                    <song-list class="list_1" :songs="playHistory" @select="selectSong"></song-list>
                                </div>
                            </scroll>
                        </div>      
                        <div class="search_history-list" v-show="showSearchHistory"> 
                            <scroll :refreshTime="refreshTime" ref="scroll_2" class="scroll" :data="searchHistory"> 
                                <div>                  
                                    <search-history class="liat_2" @searchSelect="addSearchText" @deleteHistory="DeleteSearchHistory" :searches="searchHistory"></search-history>
                                </div>  
                            </scroll>
                        </div>   
                    </div>                  
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import SearchBox from '../../base/searchbox/searchbox'
    import SearchHistory from '../../base/searchHistory/searchHistory'
    import SearchSuggest from '../searchsuggest/searchsuggest'
    import Scroll from '../../base/scroll/scroll'
    import SongList from '../../base/song-list/song-list'
    import Song from '../../js/song'

    import {searchMixin} from '../../js/mixin'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        mixins: [searchMixin],
        components: {
            SearchBox,
            SearchHistory,
            SearchSuggest,
            Scroll,
            SongList,
        },
        data () {
            return {
                add_show: false,
                showSearchHistory: false,
                showplayHistory: true,
                showSinger: false,
            }
        },
        methods: {
            addShow () {
                this.add_show = true
                setTimeout(() => {
                    this.$refs.scroll_1.refresh()
                    this.$refs.scroll_2.refresh()
                }, 200);   
            },
            addHide () {
                this.add_show = false
            },
            playhistoryShow () {
                this.showplayHistory = true
                this.showSearchHistory = false
                // setTimeout(() => {
                //     this.$refs.scroll_1.refresh()
                // }, 200);
            },
            searchhistoryShow () {
                this.showplayHistory = false
                this.showSearchHistory = true
                setTimeout(() => {
                    this.$refs.scroll_2.refresh()
                }, 200);                
            },
            selectSong (song, index) {
                if (index !== 0) {
                    this.insertSong(new Song(song))               
                }               
            },
            saveSearch () {
                this.saveHistory()
            },
            ...mapActions([
                'insertSong',
            ])
        },
        computed: {
            ...mapGetters([
                'playHistory'
            ])
        }
    }
</script>

<style scoped>
    .add_song-enter-active, .add_song-leave-active {
        transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .add_song-enter, .add_song-leave-to {
        transform: translateY(-100%);
    }
    .add-song {
        position: fixed;
        z-index: 300;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: #fff;
    }
    .add-header {
        text-align: center;
        height: 32px;  
        margin-top: 8px;
    }
    .add-text {
        font-size: 16px;
    }
    .add-close {
        position: absolute;
        display: inline-block;
        right: 12px;
        top: 9px;
    }
    .add-bottom {
        height: 100%;
    }
    .serach-result {
        margin-top: 1.5rem;
    }
    .history, .scroll {
        height: 100%;
    }
    .history-text {
        text-align: center;
        margin-bottom: 1.5rem;
    }
    .play-title, .search-title {
        display: inline-block;
        margin-top: 1.23rem;
        padding: 4px 8px;
        border: 1px solid #8080ff;
        border-radius: 9px;
    }
    .play_history-list {
        height: 100%;
        overflow: hidden;
    }
    .search_history-list {
        margin-left: 2rem;
        height: 100%;
        overflow: hidden;
    }
</style>
