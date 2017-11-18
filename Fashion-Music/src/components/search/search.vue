<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @inputText="onTextChange"></search-box>
        </div>
        <div class="hot-search-wrapper" v-show="!inputText">
            <div class="hot-search">
                <div class="hot-key">
                    <h1 class="hotKey-title">热门搜索</h1>
                    <h4 class="hotKey-change" @click="changeHotKey">换一批</h4>
                    <ul>
                        <li @click="addSearchText(hotKey.k)" v-for="hotKey in hotKeys1[indexs]" class="hotKey-content">
                            <span v-html="hotKey.k"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="search-result-wrapper" v-show="inputText">
            <search-suggest :input-text="inputText"></search-suggest>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {getHotSearch} from '../../api/search'
    import {ERR_OK} from '../../api/config'

    import SearchBox from '../../base/searchbox/searchbox'
    import SearchSuggest from '../searchsuggest/searchsuggest'
    export default {
        components: {
            SearchBox,
            SearchSuggest,
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
        methods: {
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
            // 填入input
            addSearchText (inputText) {
                this.$refs.searchBox.setSearchBox(inputText)
            },
            onTextChange (inputText) {
                this.inputText = inputText
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
        top: 178px;
        bottom: 0;
        width: 100%;
    }
    .hot-search {
        height: 100%;
        overflow: hidden;
    }
    .hot-key {
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
</style>