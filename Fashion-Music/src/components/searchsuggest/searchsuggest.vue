<template>
    <scroll class="suggest" :data="results" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest">
        <ul class="suggest-list">
            <li v-for="result in results" @click="selectItem(result)" class="suggest-item">
                <div class="suggest-icon iconfont">
                    <i :class="searchStyle(result)"></i>
                </div>
                <div class="suggest-name">
                    <p class="suggest-text" v-html="resultName(result)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
    </scroll>
</template>

<script>
    import {ERR_OK} from '../../api/config'
    import {search} from '../../api/search'
    import {creatSongs} from '../../song'
    import {mapMutations} from 'vuex'
 
    import Scroll from '../../base/scroll/scroll'
    import Loading from '../../base/loading/loading'

    const Type_Singer = 'singer'
    const perpage = 20
    export default {
        components: {
            Scroll,
            Loading,
        },
        props: {
            // 搜索框内容
            inputText: {
                type: String,
                default: ''
            },
            showSinger: {
                type: Boolean,
                default: true
            },
        },
        data () {
            return {
                page: 1,
                // 获取到的结果
                results: [],
                // 是否上拉
                pullup: true,
                hasMore: true,
            }
        },
        methods: {
            // 判断结果是歌曲或者歌手 并添加相应样式
            searchStyle (result) { 
                if (result.type === Type_Singer) {                    
                    return 'icon-singer'
                } else {
                    return 'icon-yinyue'
                }
            },
            // 判断结果是歌曲或者歌手 并显示相应内容
            resultName(result) {
                if (result.type === Type_Singer) {
                    return result.singername
                } else {
                    return `${result.name}---${result.singer}`
                }
            },
            // 搜索 调用接口
            search () {
                this.hasMore = true
                // 让页面滚动正常
                this.page = 1                
                this.$refs.suggest.scrollTo(0, 0)
                search (this.inputText, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this.results = this._dealResult(res.data)
                        this._checkMore(res.data)
                    }
                })
            },
            // 上拉刷新加载新的搜索结果
            searchMore () {
                if (!this.hasMore) {
                    return
                }
                this.page++
                search (this.inputText, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this.results = this.results.concat(this._dealResult(res.data))
                        this._checkMore(res.data)
                    }
                })
            },
            selectItem (result) {
                if (result.type === Type_Singer) {
                    const singer = {
                        id: result.singermid,
                        name: result.singername,
                        avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${result.singermid}.jpg?max_age=2592000`
                    }
                    this.$router.push({
                        path: `/search/${singer.id}`
                    })
                    this.setSinger(singer)
                }
                
            },
            // 检查是否有新数据可上拉显示
            _checkMore (data) {
                const song = data.song
                if (!data.song.list || (song.curnum + song.curpage * perpage) >= song.totalnum) {
                    this.hasMore = false
                }
            },
            // 处理获得的歌曲
            _dealSongs (list) {
                let ret = []
                list.forEach((musicData) => {
                    if (musicData.songid && musicData.albumid) {
                        ret.push(creatSongs(musicData))
                    }
                })
                return ret
            },
            // 处理获得的结果
            _dealResult (data) {
                let ret = []
                if (data.zhida && data.zhida.singerid) {
                    ret.push({...data.zhida, ...{type: Type_Singer}})
                } 
                if (data.song) {
                    ret = ret.concat(this._dealSongs(data.song.list))
                }
                return ret
            },
            ...mapMutations ({
                setSinger: 'Set_Singer'
            })
        },
        watch: {
            // 监视 搜索框内容 变化时搜索
            inputText () {
                this.search()
            }
        },

    }
</script>

<style scoped>
    @import '../../base/searchbox/searchfont/iconfont.css';
    .suggest {
        height: 100%;
        overflow: hidden;
    }
    .suggest-list {
        padding: 0 30px;
    }
    .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
    }
    .suggest-icon {
        flex: 0 0 30px;      
    }
    .suggest-item[class^='icon-'] {
        color: rgba(255, 255, 255, 0.3);
        font-size: 14px;
    }
    .suggest-name {
        flex: 1;
        font-size: 14px;
        color: rgba(7, 17, 27, 0.7);
        overflow: hidden;
    }
    .suggest-text { 
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        white-space: nowrap;
    }
</style>
