<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @inputText="onTextChange"></search-box>
        </div>
        <div class="hot-search-wrapper" v-show="!inputText">
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
                    <span class="icon iconfont">
                         <i class="icon-delete"></i>
                    </span>
                </h1>
                <search-history :searches="searchHistory"></search-history>
            </div>
        </div>
        <div class="search-result-wrapper" v-show="inputText">
            <search-suggest @searchHistory="saveHistory" @resultScroll='inputBlur' :input-text="inputText"></search-suggest>
        </div>        
        <router-view></router-view>
    </div>
</template>

<script>
    import {getHotSearch} from '../../api/search'
    import {ERR_OK} from '../../api/config'
    import {mapActions, mapGetters} from 'vuex'

    import SearchBox from '../../base/searchbox/searchbox'
    import SearchSuggest from '../searchsuggest/searchsuggest'
    import SearchHistory from '../../base/searchHistory/searchHistory'
    export default {
        components: {
            SearchBox,
            SearchSuggest,
            SearchHistory,
        },
        created () {
            this._getHotSearch()
        },
        data () {
            return {
                hotKeys: [],
                hotKeys1: [],
                indexs: 0,
                inputText: '',
            }
        },   
        computed: {
            ...mapGetters([
                'searchHistory'
            ])
        },    
        methods: {
            saveHistory () {
                this.SaveSearchHistory(this.inputText)
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
            inputBlur () {
                this.$refs.searchBox.blur()
            },
            // 换热搜词
            changeHotKey () {
                this.indexs++ 
                if (this.indexs === 3) {
                    this.indexs = 0
                }
            },
            // 填入input
            addSearchText (inputText) {
                this.$refs.searchBox.setSearchBox(inputText)
            },
            onTextChange (inputText) {
                this.inputText = inputText
            },
            ...mapActions([
                'SaveSearchHistory',
            ])
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
    }
    .hot-search {
        overflow: hidden;
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
        position: absolute;
        margin: 0 20px 20px 20px;
        width: 100%;
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
    .history-title > .icon {
        display: inline-block;
        position: relative;
        font-size: 18px;
        bottom: 8px;
        right: 24px;
        color: rgba(7, 17, 27, 0.3)
    }
</style>