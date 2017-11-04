<template>
    <div class="recommend">
        <div v-if="recommends.length" class="recommend-content">
            <div class="slider-wrapper">
                <slider>
                    <div v-for="recommend in recommends">
                        <a :href="recommend.linkUrl">
                            <img :src="recommend.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门推荐</h1>
                <ul>
                     
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
    }
    .recommend-content {
        height: 100%;
        overflow: hidden;
    }
    .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .slider-content {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .slider-item {
        display: inline-block;       
    }
</style>

<script>
    import Slider from '../../base/slider/slider.vue'

    import {getRecommend} from '../../api/recommend'
    import {ERR_OK} from '../../api/config'

    export default {
        components: {
            Slider,
        },
        data () {
            return {
                recommends: [],
            }
        },
        created () {
            this._getRecommend();
        },
        methods: {
            _getRecommend () {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider
                        // console.log(this.recommends);
                    }
                });
            }
        }           
    }
</script>