<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @inputText="onTextChange"></search-box>
        </div>
        <scroll class="hot-search-wrapper" ref="ScrollD" v-show="!inputText" :data="data_scroll">
            <div class="A1">
                <div class="hot-search">
                    <!-- <div class="hot-key"> -->
                        <h1 class="hotKey-title">热门搜索</h1>
                        <h4 class="hotKey-change" @click="changeHotKey">换一批</h4>
                        <ul>
                            <li @click="addSearchText(hotKey.k)" v-for="hotKey in hotKeys1[indexs]" class="hotKey-content">
                                <span v-html="hotKey.k"></span>
                            </li>
                        </ul>
                    <!-- </div> -->
                </div>
                <div class="search-history" v-show="searchHistory.length">
                    <h1 class="history-title">
                        <span class="name">搜索历史</span>
                        <img @click="showConfirm" class="icon-delete" src="../../base/searchbox/clear.svg" width="18" height="18">
                    </h1>
                    <search-history :searches="searchHistory" @searchSelect="addSearchText" @deleteHistory="DeleteSearchHistory"></search-history>
                </div>
            </div>       
        </scroll>
        <div class="search-result-wrapper" v-show="inputText" ref="resultW">
            <search-suggest ref="suggest" @searchHistory="saveHistory" @resultScroll='inputBlur' :input-text="inputText"></search-suggest>
        </div>   
        <confirm ref="conFirm" text="确认删除所有历史记录吗？" btnConfirm="清空" @confirmConfirm="ClearSearchHistory"></confirm>     
        <router-view></router-view>
    </div>
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

<style scoped>
    li {
        list-style: none;
    }
    .hot-search-wrapper {
        position: fixed;
        top: 152px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }
    .hot-search {
        margin: 0 20px 20px 20px;
    }
    .hotKey-title, .hotKey-change {
        display: inline-block;
    }
    .hotKey-title {
        margin-bottom: 20px;
        font-size: 24px;
        color: rgba(7, 17, 27, 0.7);
    }
    .hotKey-change {
        position: absolute;
        font-size: 18px;
        top: 6px;
        right: 8px;
        color: rgba(7, 17, 27, 0.3)
    }
    .hotKey-content {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: rgba(255, 205, 49, 0.5);
    }
    .search-result-wrapper {
        position: fixed;
        width: 100%;
        top: 152px;
        bottom: 0;
    }
    .search-history {
        position: relative;
        margin: 0 20px 20px 20px;
        width: 100%;
        overflow: hidden;
    }
    .history-title {
        width: 100%;
    }
    .history-title > .name {
        display: inline-block;
        font-size: 24px;
        color: rgba(7, 17, 27, 0.7);
        text-align: left;
    }
    .history-title > .icon-delete {
        display: inline-block;   
        position: absolute;    
        right: 40px; 
        padding-top: 4px;
        color: rgba(7, 17, 27, 0.3)    
    }
</style>