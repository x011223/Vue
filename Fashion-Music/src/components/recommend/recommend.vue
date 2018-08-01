<template>
    <transition name="Recommend">
        <div class="recommend" ref="recommend">
            <scroll class="recommend-content" :data="discLists" ref="scroll">
                <div class="scroll-wrapper">
                    <div v-if="recommends.length" class="slider-wrapper">
                        <slider>
                            <div v-for="(recommend, index) in recommends" :key="index">
                                <a :href="recommend.linkUrl">
                                    <img @load="loadImage" :src="recommend.picUrl">
                                </a>
                            </div>
                        </slider>
                    </div>
                    <div class="recommend-list">
                        <h1 class="list-title">热门推荐</h1>
                        <ul>
                            <li v-for="(discList, index) in discLists" :key="index" class="discList" @click="selectDisc(discList)">
                                <div class="list-icon">
                                    <img v-lazy="discList.imgurl" width="60" height="60">
                                </div>
                                <div class="list-text">
                                    <h2 class="name" v-html="discList.creator.name"></h2>
                                    <p class="desc" v-html="discList.dissname"></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <loading class="loading-wrapper" v-show="!discLists.length"></loading>
                </div>
            </scroll>
            <router-view></router-view>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
    @import '../../sass/mixin.scss';
    @import '../../sass/style.scss';
    .Recommend-enter-active, .Recommend-leave-active {
        transition: all 0.3s 
    }
    .Recommend-enter, .Recommend-leave-to {
        transform: translateX(-100%)
    }
    .recommend {
        position: fixed;
        width: 100%;
        top: 6.5rem;
        bottom: 0;
        overflow: hidden;
        .recommend-content {
            height: 100%;
            .scroll-wrapper {
                overflow: hidden;
                .slider-wrapper {
                    position: relative;
                    width: 100%;
                }
                .recommend-list {
                    .list-title {
                        height: $height-big-xx;
                        line-height: $height-big-xx;
                        text-align: center;
                        font-size: $font-size-b;
                        color: #a60000;
                    }
                    ul {
                        .discList {
                            display: flex;
                            box-sizing: border-box;
                            align-items: center;
                            padding: 0 20px 20px;
                            overflow: hidden;
                            .list-icon {
                                flex: 0 0 60px;
                                width: 60px;
                                padding-right: $height-small;
                            }
                            .list-text {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                flex: 1;
                                line-height: $height-small;
                                overflow: hidden;
                                font-size: 12px;
                                .name {
                                    margin-bottom: 10px;
                                    color: $color-text-name;
                                    @include lineFlow ($width: 100%);
                                }
                                .desc {
                                    color: $color-text-desc;
                                    @include lineFlow ($width: 100%);
                                }
                            }
                        }
                    }
                }
            }
            @include loadingStyle;
        }
    }  
</style>

<script>
    import Slider from '../../base/slider/slider.vue'
    import Scroll from '../../base/scroll/scroll.vue'
    import Loading from '../../base/loading/loading.vue'

    import {getRecommend, getDiscList} from '../../api/recommend'
    import {ERR_OK} from '../../api/config'
    import {playMixin} from '../../js/mixin'
    import {mapMutations} from 'vuex'

    export default {
        mixins: [playMixin],
        components: {
            Slider,
            Scroll,
            Loading,
        },
        data () {
            return {
                recommends: [],
                discLists: []
            }
        },
        created () {
            this._getRecommend()    
            this._getDiscList()        
        },
        methods: {
            selectDisc (discList) {
                this.$router.push({
                    path: `/recommend/${discList.dissid}`
                })
                this.setDiscDetail(discList)
            },
            handlePlaylist (playlist) {
                const listBottom = playlist.length > 0 ? '60px' : ''
                this.$refs.recommend.style.bottom = listBottom
                this.$refs.scroll.refresh()
            },
            _getRecommend () {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider
                    }
                });
            },
            _getDiscList () {
                getDiscList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.discLists = res.data.list
                    }
                })
            },
            loadImage () {
                if (!this.checkLoaded) {
                    this.$refs.scroll.refresh()
                    this.checkLoaded = true
                }               
            },
            ...mapMutations({
                setDiscDetail: 'Set_Disc_Detail'
            })
        }           
    }
</script>