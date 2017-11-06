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
            },
            // 代理bett-scroll
            enable () {
                this.scroll && this.scroll.enable()
            },
            disable () {
                this.scroll && this.scroll.disable()
            },
            //刷新scroll,重新计算高度
            refresh () {
                this.scroll && this.scroll.refresh()
            }
        },
        watch: {
            data () {
                //data 变化
                setTimeout(() => {
                    this.refresh()
                }, 20)
            }
        }
    }
</script>

<style scoped>
    
</style>


