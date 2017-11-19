<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>

            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(dot, id) in dots" :class="{active: pageId === id}"></span>
        </div>
    </div>
</template>

<style scoped>
    .slider {
        min-height: 1px;
    }
    .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
    }
    .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
    }
    .slider-item a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
    }
    .slider-item img {
        display: block;
        width: 100%;
    }
    .dots {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;
    }
    .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #cccccc;
    }
    .dots .active {
        width: 20px;
        border-radius: 5px;
        background: #d00000;
    }
</style>

<script>
    import {addClass} from '../../js/dom'
    import betterScroll from 'better-scroll'
    
    export default {
        data () {
            return {
                dots: [],
                pageId: 0,
            }
        },
        props: {
            // 循环轮播图片
            loop: {
                type: Boolean,
                default: true
            },
            // 自动轮播图片
            autoPlay: {
                type: Boolean,
                default: true
            },
            // 轮播时间间隔
            interval: {
                type: Number,
                default: 2000
            },
        },
        mounted () {
            setTimeout(() => {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();
                if (this.autoPlay) {
                    this._play()
                }
            }, 20);
            window.addEventListener('reSize', () => {
                if (!this.slider) {
                    return
                }
                this._setSliderWidth(true)
                this.slider.refresh()
            })
        },
        methods: {
            // 设置轮播宽度
            _setSliderWidth (isResize) {
                //获取
                this.children = this.$refs.sliderGroup.children
                let width = 0
                //可见宽度
                let sliderWidth = this.$refs.slider.clientWidth
                //为节点添加类
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]   
                    //为每个子节点添加类 slider-item            
                    addClass(child, 'slider-item')
                    //设置每个子节点宽度为可见宽度
                    child.style.width = sliderWidth + 'px'
                    //计算总宽度                   
                    width += sliderWidth                      
                }
                //循环轮播为真,总宽度需加 2*sliderWidth（可见宽度）
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initDots () {
                this.dots = new Array(this.children.length)
            },
            _initSlider () {
                this.slider = new betterScroll (this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400,
                    },
                    click: true,
                })
                //监听事件,滚动结束时间,取得此时页面位置pageX
                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX
                    //循环轮播,复制了2个子节点,因此索引需要减1
                    if (this.loop) {
                        pageIndex -= 1
                    }
                    this.pageId = pageIndex
                    if (this.autoPlay) {
                        //清除轮播时间,防止自动轮播与触摸轮播冲突
                        clearTimeout(this.TimeOut)
                        this._play()
                    }
                })
                this.slider.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.TimeOut)
                    }
                })
            },
            _play () {
                let pageIndex = this.pageId + 1
                if (this.loop) {
                    pageIndex += 1
                }
                this.TimeOut = setInterval(() => {
                    //goToPage better-scroll提供
                    // 0 代表纵向, 400 横向,
                    this.slider.goToPage(pageIndex, 0, 400)
                }, this.interval)
            }           
        },
        destroyed () {
            //slider 组件切换时,自动调用destroyed hook
            clearTimeout(this.TimeOut)
        }
    }
</script>


