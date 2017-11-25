<template>
    <scroll class="listview" :data="data" ref="listview"
                             :listenScroll = "listenScroll"
                             @scroll="scroll"
                             :probe-type="probeType">
        <ul>
            <li v-for="group in data" class="list-group" ref="listgroup">
                <h2 class="boxSize list-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-item" @click="selectItem(item)">
                        <img class="lineSize item-avatar" v-lazy="item.avatar">
                        <span class="item-name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-enter" @touchstart="onListEnterTouch" @touchmove.stop.prevent="onListMove">
            <ul>
                <!-- 获取到触摸点击的index -->
                <li class="item-pos" v-for="(item, index) in listEnter" :data-index="index" :class="{'current':currentIndex===index}">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed posAbs" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </Scroll>
</template>

<script>
    import Scroll from '../scroll/scroll.vue'
    import Loading from '../../base/loading/loading.vue'

    import {getData} from '../../js/dom'

    const anchor_Height = 18
    const TITLE_HEIGHT = 30

    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        created () {
            // 获取touch 的值
            this.touch = {},
            //监视滚动事件
            this.listenScroll = true,
            //监视滚动高度
            this.listenHeight = [],
            //派发滚动事件
            this.probeType = 3
        },
        data () {
            return {
                //观测实时滚动的位置
                scrollY: -1,
                currentIndex: 0,
                //fixedTitle和group.title的差
                diff: -1
            }         
        },
        components: {
            Scroll,
            Loading,
        },
        computed: {
            //列表右侧入口,双向联动
            listEnter () {
                //对传入的数据排序
                return this.data.map((group) => {
                    return group.title.substr(0, 1)
                })
            },
            fixedTitle () {
                if (this.scrollY > 0) {
                    return
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        watch: {
            data () {
                setTimeout(() => {
                    this._calHeight()
                })
            },
            scrollY(newY) {
                const listHeight = this.listHeight
                // 当滚动到顶部，newY>0
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                // 在中间部分滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i]
                    let height2 = listHeight[i + 1]
                    if ((-newY >= height1 && -newY < height2)) {
                        this.currentIndex = i
                        this.diff = height2 + newY
                        return
                    }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                //diff 实时变化, 滚动不发生时DOM不变化
                if (this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        },
        methods: {
            //确认点击的元素,由外部组件接收点击事件
            selectItem (item) {
                this.$emit('select', item)
            },
            // 点击右侧字母,左侧跳转到相应位置
            onListEnterTouch (e) {
                let anchorIndex = getData(e.target, 'index')
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                this._ScrollTo(anchorIndex)
            },
            //长安触摸右侧,左侧滚动到相应位置
            onListMove (e) {
                let firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / anchor_Height | 0
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta
                this._ScrollTo(anchorIndex)
            },
            refresh () {
                this.$refs.listview.refresh()
            },
            scroll (pos) {
                // 滚动的Y轴的距离
                this.scrollY = pos.y
            },
            //计算每个列表项的高度
            _calHeight () {
                this.listHeight = []
                const list = this.$refs.listgroup
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            },
            _ScrollTo (index) {
                // 0 ,动画缓动时间
                // this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0)
                if (!index && index !== 0) {
                    return
                }
                if (index < 0) {
                    index = 0
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2
                }
                //点击右侧,高亮跟随
                this.scrollY = -this.listHeight[index]
                this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/mixin.scss';
    @import '../../sass/style.scss';
    .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: $background-color-list;
        .list-group {
            margin-bottom: 12px;
            .list-title {
                height: $height-big;
                line-height: $height-big;
                padding-left: $padding-left-list-item;
                font-size: $font-size-n;
                color: $color-text-title;
                background: $background-color-compare;
            }
            .list-item {
                display: flex;
                align-items: center;
                padding: {
                    top: $padding-top-list-item;
                    left: $padding-left-list-item;
                }
                .item-avatar {
                    width: $height-big-xx;
                    height: $height-big-xx;
                    border-radius: 50%;
                }
                .item-name {
                    margin-left: 20px;
                    color: $color-text-name;
                    font-size: $font-size-b;
                }
            }
        }
        .list-enter {
            position: absolute;
            z-index: 30;
            right: 0;
            top: 50%;
            /*! 使侧边定位栏上移50%*/
            transform: translateY(-50%);
            text-align: center;
            .item-pos {
                list-style: none;
                padding: 3px;
                line-height: 1;
                color: #0065ca;
                font-size: $font-size-s;
            }
            .current {
                color: red;
            }
        }
        .list-fixed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            .fixed-title {
                height: $height-big;
                line-height: $height-big;
                padding-left: $padding-left-list-item;
                font-size: $font-size-n;
                color: $color-text-medium;
                background: $background-color-title;
            }
        }
        @include loadingStyle;
    }  
</style>


