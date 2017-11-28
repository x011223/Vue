<template>
    <transition name="Rank">
        <div class="rank" ref="rank">
            <scroll :data="topList" class="toplist" ref="topList">
                <ul>
                    <li v-for="rankItem in topList" class="item" @click="showTopList(rankItem)">
                        <div class="icon">
                            <img v-lazy="rankItem.picUrl" width="100" height="100">
                        </div>               
                        <ul class="songlist">
                            <li v-for="(songItem, index) in rankItem.songList" class="song">
                                <span>{{index + 1}}</span>
                                <span>{{songItem.songname}}-{{songItem.singername}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <loading v-show="!topList.length" class="loading"></loading>
            </scroll>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {getTopList} from '../../api/rank'
    import {ERR_OK} from '../../api/config'
    import {playMixin} from '../../js/mixin'

    import Scroll from '../../base/scroll/scroll'
    import Loading from '../../base/loading/loading'

    export default {
        mixins: [playMixin],
        components: {
            Scroll,
            Loading,
        },
        created () {
            this._getTopList()
        },
        data () {
            return {
                topList: []
            }
        },
        methods: {
            handlePlaylist (playlist) {
                const rankBottom = playlist.length > 0 ? '60px' : 0
                this.$refs.rank.style.bottom = rankBottom
                this.$refs.topList.refresh()
            },
            showTopList (rankItem) {
                this.$router.push({
                    path: `/rank/${rankItem.id}`
                })
                this.setTopList(rankItem)
            },
            _getTopList () {
                getTopList().then((res) => {                   
                    if (res.code === ERR_OK) {
                        this.topList = res.data.topList
                    } 
                })
            },
            ...mapMutations ({
                setTopList: 'Set_Top_List',
            })
        }
    }   
</script>

<style lang="scss" scoped>
    @import '../../sass/style.scss';
    @import '../../sass/mixin.scss';
    .Rank-enter-active, .Rank-leave-active {
        transition: all 0.1s 
    }
    .Rank-enter, .Rank-leave-to {
        transform: translateX(100%)
    }
    .rank {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        .toplist {
            height: 100%;
            overflow: hidden;
            .item {
                display: flex;
                margin: 0 20px;
                padding-top: 20px;
                height: 100px;
                &:last-child {
                    padding-bottom: 20px;
                }
                .icon {
                    flex: 0 0 100px;
                    width: 100px;
                    height: 100px;
                }
            }
            .songlist {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 20px;
                height: 100px;
                overflow: hidden;
                background: #333;
                color: rgba(255, 205, 49, 0.5);
                font-size: 12px;
                .song {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    line-height: 26px;
                }
            }
        }
        .loading {
            @include loadingStyle;
        }
    }
</style>



