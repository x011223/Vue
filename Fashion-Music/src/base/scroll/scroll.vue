<template>
    <div ref="scroll">
        <slot>
        </slot>
    </div>
</template>

<script>
    import betterScroll from 'better-scroll'
    export default {
        props: {
            //监听滚动事件
            probeType: {
                type: Number,
                default: 1
            },
            //监听点击事件
            click: {
                type: Boolean,
                default: true
            },
            //刷新scroll,同步数据更新
            data: { 
                type: Array,
                default: null
            },
            // 监听是否存在滚动事件
            listenScroll: {
                type: Boolean,
                default: false
            },
            // 上拉
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshTime: {
                type: Number,
                default: 300
            }
        },
        mounted () {
            setTimeout(() => {
                this._initScroll()
                 //默认20
            }, 20);
        },
        methods: {
            _initScroll () {
                //没有值时,初始化better-scroll第一个参数undefined,会报错
                if (!this.$refs.scroll) {
                    return
                }
                this.scroll = new betterScroll (this.$refs.scroll, {
                    //外部控制参数值
                    probeType: this.probeType,
                    click: this.click
                }) 
                if (this.listenScroll) {
                    let outThis = this
                    this.scroll.on('scroll', (pos) => {
                        outThis.$emit('scroll', pos)
                    }) 
                }
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () =>{
                        this.$emit('beforeScroll')
                    })
                }
            },
            // 代理bett-scroll
            enable () {
                this.scroll && this.scroll.enable()
            },
            disable () {
                this.scroll && this.scroll.disable()
            },
            // 刷新scroll,重新计算高度
            // 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
            refresh () {
                this.scroll && this.scroll.refresh()
            },
            // 滚动到指定位置
            // 调用apply接收参数           
            scrollTo () {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            // 作用：滚动到指定的目标元素。
            scrollToElement () {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },
        },
        watch: {
            data () {
                //data 变化
                setTimeout(() => {
                    this.refresh()
                }, this.refreshTime)
            }
        }
    }
</script>

<style scoped>
    
</style>


