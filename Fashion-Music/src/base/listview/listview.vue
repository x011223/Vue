<template>
    <Scroll class="listview" :data="data" ref="listview">
        <ul>
            <li v-for="group in data" class="list-group" ref="listgroup">
                <h2 class="list-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-item">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="item-name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-enter" @touchstart="onListEnterTouch" @touchmove.stop.prevent="onListMove">
            <ul>
                <!-- 获取到触摸点击的index -->
                <li class="item" v-for="(item, index) in listEnter" :data-index="index">{{item}}</li>
            </ul>
        </div>
    </Scroll>
</template>

<script>
    import Scroll from '../scroll/scroll.vue'

    import {getData} from '../../dom'

    const anchor_Height = 18

    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        created () {
            // 获取touch 的值
            this.touch = {}
        },
        components: {
            Scroll,
        },
        computed: {
            //列表右侧入口,双向联动
            listEnter () {
                //对传入的数据排序
                return this.data.map((group) => {
                    return group.title.substr(0, 1)
                })
            },
        },
        methods: {
            // 点击右侧字母,左侧跳转到相应位置
            onListEnterTouch (e) {
                let anchorIndex = getData(e.target, 'index')
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                this._ScrollTo(anchorIndex)
            },
            onListMove (e) {
                let firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / anchor_Height | 0
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta
                this._ScrollTo(anchorIndex)
            },
            _ScrollTo (index) {
                // 0 ,动画缓动时间
                this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0)
            }
        }
    }
</script>

<style scoped>
    .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: rgba(233, 233, 233, 0.3);
    }
    .list-group {
        padding-bottom: 30px;
    }
    .list-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 12px;
        color: rgba(7, 17, 27, 0.4);
        background: #e3e3e3;
    }
    .list-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
    }
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .item-name {
        margin-left: 20px;
        color: #00a4a4;
        font-size: medium;
    }
    .list-enter {
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        font-family: Helvetica;
    }
    .item {
        list-style: none;
        padding: 3px;
        line-height: 1;
        color: #0065ca;
        font-size: 8px;
    }
</style>


