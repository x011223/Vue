<template>
    <transition name="Search">
        <div class="search">
            <div class="search-box-wrapper">
                <search-box ref="searchBox" @inputText="onTextChange"></search-box>
            </div>
            <scroll class="hot-search-wrapper" ref="ScrollD" v-show="!inputText" :data="data_scroll">
                <div class="A1">
                    <div class="hot-search">
                            <h1 class="hotKey-title">热门搜索</h1>
                            <h4 class="hotKey-change" @click="changeHotKey">换一批</h4>
                        <ul class="content-warpper">
                            <li @click="addSearchText(hotKey.k)" v-for="hotKey in hotKeys1[indexs]" class="hotKey-content">
                                <span v-html="hotKey.k"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="history-title">
                            <span class="name">搜索历史</span>
                            <img @click="showConfirm" class="icon-delete" src="../../base/searchbox/clear.svg" width="18" height="18">
                        </h1>
                        <search-history class="history-content" :searches="searchHistory" @searchSelect="addSearchText" @deleteHistory="DeleteSearchHistory"></search-history>
                    </div>
                </div>       
            </scroll>
            <div class="search-result-wrapper" v-show="inputText" ref="resultW">
                <search-suggest ref="suggest" @searchHistory="saveHistory" @resultScroll='inputBlur' :input-text="inputText"></search-suggest>
            </div>   
            <confirm ref="conFirm" text="确认删除所有历史记录吗？" btnConfirm="清空" @confirmConfirm="ClearSearchHistory"></confirm>     
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import {getHotSearch} from '../../api/search'
    import {ERR_OK} from '../../api/config'
    import {mapActions, mapGetters} from 'vuex'
    import {playMixin, searchMixin} from '../../js/mixin'

    import SearchBox from '../../base/searchbox/searchbox'
    import SearchSuggest from '../searchsuggest/searchsuggest'
    import SearchHistory from '../../base/searchHistory/searchHistory'
    import Confirm from '../../base/confirm/confirm'
    import Scroll from '../../base/scroll/scroll'
    
    export default {
        mixins: [playMixin, searchMixin],
        components: {
            SearchBox,
            SearchSuggest,
            SearchHistory,
            Confirm,
            Scroll,
        },
        created () {
            this._getHotSearch()
        },
        data () {
            return {
                hotKeys: [],
                hotKeys1: [],
                indexs: 0,
            }
        },   
        computed: {           
            data_scroll () {
                return this.hotKeys.concat(this.searchHistory)
            }
        },    
        methods: {
            handlePlaylist (playlist) {
                const searchBottom = playlist.length > 0 ? '60px' : ''                
                this.$refs.ScrollD.$el.style.bottom = searchBottom
                this.$refs.ScrollD.refresh()
                this.$refs.resultW.style.bottom = searchBottom
                this.$refs.suggest.refresh()
            },
            showConfirm () {
                this.$refs.conFirm.confirmShow()
            },            
            // 获得热搜数据
            _getHotSearch () {
                getHotSearch().then((res) => {
                    if (res.code === ERR_OK) {
                        this.hotKeys = res.data.hotkey
                        this.hotKeys1.push(res.data.hotkey.slice(0, 10))
                        this.hotKeys1.push(res.data.hotkey.slice(11, 20))
                        this.hotKeys1.push(res.data.hotkey.slice(21, 30))               
                    }
                })
            },            
            // 换热搜词
            changeHotKey () {
                this.indexs++ 
                if (this.indexs === 3) {
                    this.indexs = 0
                }
            },          
            ...mapActions([
                'ClearSearchHistory',
            ])
        },
        watch: {
            inputText (newInputText) {
                if (!newInputText) {
                    setTimeout(() => {
                        this.$refs.ScrollD.refresh()
                    }, 20);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/style.scss';
    @import '../../sass/mixin.scss';
    .Search-enter-active, .Search-leave-active {
        transition: all 0.1s 
    }
    .Search-enter, .Search-leave-to {
        transform: translateX(100%)
    }
    li {
        list-style: none;
    }
    .search {
        overflow: hidden;
        width: 100%;
        height: 100%;
        .hot-search-wrapper {
            position: absolute;
            top: 10rem;
            bottom: 0;
            width: 100%;
            overflow: hidden;
            margin-top: $height-small-s;
            .A1 {
                .hot-search {
                    .hotKey-title {   
                        height: $height-big-x;
                        line-height: $height-big-x;
                        padding-left: 1.6rem;
                        background: $background-color-title-dark;                  
                        font: {
                            size: $font-size-X;
                            weight: $font-weight-s;
                        }
                    }
                    .hotKey-change {
                        position: absolute;  
                        top: 0.75rem;
                        right: 1.4rem; 
                        font-weight: $font-weight-s;
                    }
                    .content-warpper {
                        margin-bottom: 1.6rem;
                        padding-left: 1.6rem;
                        .hotKey-content { 
                            padding: {
                                top: 8px;
                                right: 8px;
                            }
                            display: inline-block;
                            margin-top: 16px;
                            span {                                
                                padding: 8px 8px;                
                                border-radius: 9px;
                                background: $background-color-light;
                            }
                        }
                    }
                }
                .search-history {
                    .history-title {
                        position: relative;                        
                        padding-left: 1.6rem;
                        background: $background-color-title-dark;
                        .name {
                            height: $height-big-x;
                            line-height: $height-big-x;
                            font: {
                                size: $font-size-X;
                                weight: $font-weight-s;
                            }
                            @include lineFlow($width: 100%);
                        }
                        .icon-delete {
                            position: absolute;
                            right: 2.4rem;
                            top: 1rem;
                        }
                    }
                    .history-content {
                        padding: {
                            left: 1.6rem;
                            top: 0.5rem;
                        }
                    }
                }
            }
        }
        .search-result-wrapper {
            margin-top: $height-small;
            position: absolute;
            width: 100%;
            top: 10rem;
            overflow: hidden;
            bottom: 0;
        }
    }
</style>