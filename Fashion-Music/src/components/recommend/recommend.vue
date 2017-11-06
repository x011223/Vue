<template>
    <div class="recommend">
        <Scroll class="recommend-content" :data="discLists" ref="scroll">
            <div class="scroll-wrapper">
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="recommend in recommends">
                            <a :href="recommend.linkUrl">
                                <img @load="loadImage" :src="recommend.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门推荐</h1>
                    <ul>
                        <li v-for="discList in discLists" class="discList">
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
        </Scroll>
    </div>
</template>

<style scoped>
    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        overflow: hidden;
    }
    .recommend-content {
        height: 100%;
        overflow: hidden;
    }
    .scroll-wrapper {
        overflow: hidden;
    }
    .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .list-title {
        height: 52px;
        line-height: 52px;
        text-align: center;
        font-size: 16px;
        color: #a60000;
    }
    .discList {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        overflow: hidden;
    }
    .list-icon {
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
    }
    .list-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: 12px;
    }
    .name {
        margin-bottom: 10px;
        color: #408060;
    }
    .desc {
        color: #408099;
    }
    .loading-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
    }
</style>

<script>
    import Slider from '../../base/slider/slider.vue'
    import Scroll from '../../base/scroll/scroll.vue'
    import Loading from '../../base/loading/loading.vue'

    import {getRecommend, getDiscList} from '../../api/recommend'
    import {ERR_OK} from '../../api/config'

    export default {
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
                        // console.log(this.discLists)
                    }
                })
            },
            loadImage () {
                if (!this.checkLoaded) {
                    this.$refs.scroll.refresh()
                    this.checkLoaded = true
                }               
            }
        }           
    }
</script>