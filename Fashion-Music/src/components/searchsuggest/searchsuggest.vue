<template>
    <transition name="Suggest">
        <scroll class="suggest" :data="results" 
                :pullup="pullup" @scrollToEnd="searchMore"
                ref="suggest" :before-scroll="beforeScroll"
                @beforeScroll="resultScroll"
                :refreshTime="refreshTime">
            <ul class="suggest-list">
                <li v-for="(result, index) in results" :key="index" @click="selectItem(result)" class="suggest-item">
                    <div class="suggest-icon">
                        <!-- <img src="../../base/searchbox/song.svg" width="22" height="22"> -->
                        <span>歌曲</span>
                    </div>
                    <div class="suggest-name">
                        <p class="suggest-text" v-html="resultName(result)"></p>
                    </div>
                </li>
                <loading v-show="hasMore" title="正在请求......" class="loading"></loading>
            </ul>
            <no-result v-show="!hasMore && !results.length" title="您需要的东西正光速运送" class="no-result"></no-result>
        </scroll>
    </transition>
</template>

<script>
    import {ERR_OK} from '../../api/config'
    import {search} from '../../api/search'
    import {creatSongs} from '../../js/song'
    import {mapMutations, mapActions} from 'vuex'
 
    import Scroll from '../../base/scroll/scroll'
    import Loading from '../../base/loading/loading'
    import NoResult from '../../base/no-result/no-result.vue'

    const Type_Singer = 'singer'
    const perpage = 20
    export default {
        components: {
            Scroll,
            Loading,
            NoResult,
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
                beforeScroll: true,
                type_singer: false,
                refreshTime: 200,
            }
        },
        methods: {
            // Loading () {
            //     return !results.length ? 'loading-container' : ''
            // },
            type_singer () {
                if (result.type === Type_Singer) {
                    // 判断结果是歌曲或者歌手 并添加相应样式
                    return 'icon-singer'
                } else {
                    return 'icon-song'
                }
            },
            refresh () {
                this.$refs.suggest.refresh()
            },
            resultScroll (){
                this.$emit('resultScroll')
            },
            // 判断结果是歌曲或者歌手 并显示相应内容
            resultName(result) {
                if (result.type === Type_Singer) {
                    // 判断结果是歌曲或者歌手 并添加相应样式
                    this.type_singer = true
                    return result.singername
                } else {
                    this.type_singer = false
                    return `${result.name}---${result.singer}`
                }
            },
            // 搜索 调用接口
            search () {
                this.hasMore = true;
                // 让页面滚动正常
                this.page = 1;            
                this.$refs.suggest.scrollTo(0, 0);
                search (this.inputText, this.page, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        console.log(res);
                        this.results = this._dealResult(res.data);
                        this._checkMore(res.data);
                    }
                })
            },
            // 上拉刷新加载新的搜索结果
            searchMore () {
                if (!this.hasMore) {
                    return
                }
                this.page++
                search (this.inputText, this.page, perpage).then((res) => {
                    if (res.code === ERR_OK) {
                        this.results = this.results.concat(this._dealResult(res.data));
                        this._checkMore(res.data);
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
                    this.setSinger(singer);
                } else {
                    this.insertSong(result);
                }
                this.$emit('searchHistory')
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
                let ret
                list.forEach((item) => {
                    let musicData = item;
                    if (musicData.songid && musicData.albumid) {
                        ret.push(creatSongs(musicData))
                        // creatSongs(musicData).then((res) => {
                        //     ret.push(res)
                        //     return ret
                        // })
                    }
                })
                // return ret
            },
            // 处理获得的结果
            _dealResult (data) {
                let ret = [];
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
            }),
            ...mapActions ([
                'insertSong'
            ])
        },
        watch: {
            // 监视 搜索框内容 变化时搜索
            inputText () {
                this.search()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/style.scss';
    @import '../../sass/mixin.scss';
    .suggest {
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: absolute; 
        background: $background-color-list;
        .suggest-list {
            overflow: hidden;
            margin: {
                left: 2rem;
                top: 1rem;
            }
            .suggest-item {
                .suggest-icon {
                    margin-top: 1px;
                }
                .suggest-text {
                    position: relative;
                    left: 2.5rem;
                    top: -1.5rem;
                    color: $color-text-name;
                    @include lineFlow ($width: 100%);
                }
            }
        }
        .loading {
            @include loadingStyle;
        }
    }
</style>
