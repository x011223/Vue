<template>
    <div class="search-box">
        <div class="iconsearch iconfont">
            <i class="icon-search"></i>
        </div>
        <input id="searchBox" v-model="inputText" :placeholder="placeholder" @click="cancelShow">
        <div class="iconclear iconfont" v-show="inputText" @click="boxClear">
            <i class="icon-clear"></i>
        </div>
        <span class="searchCancel" v-show="isCancelShow || this.inputText" @click="cancelHide">取消</span>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                inputText: '',
                isCancelShow: false,
            }
        },
        props: {
            // input 中的默认内容
            placeholder: {
                type: String,
                default: '搜索歌手，歌曲'
            },
        },
        methods: {
            // 清空input中的内容
            boxClear () {
                this.inputText = ''
            },
            // 显示'取消'
            cancelShow () {
                this.isCancelShow = true
            },
            // 隐藏'取消'
            cancelHide () {
                this.isCancelShow = false
            },
            // 向搜索框填入搜索内容
            setSearchBox (inputText) {
                this.inputText = inputText
            }
        },
        created () {
            // 派发事件，通知外部组件inputText改变
            this.$watch('inputText', (newInputText) => {
                this.$emit('inputText', newInputText)
            })
        },
    }
</script>

<style scoped>
    @import './searchfont/iconfont.css';
    #searchBox {
        flex: 1;
        width: 100%;
        text-indent: 32px;
        height: 32px;
        border: none;
        line-height: 18px;
        padding: 0 8px;
    }
    .search-box {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 6px;
        margin-top: 12px;
        height: 40px;
        background: #9999ff;
        border-radius: 6px;
    }
    .iconsearch {
        position: absolute;
    }
    .iconclear {
        position: absolute;
        right: 64px;
    }
    .searchCancel {
        margin-left: 8px;
        padding: 0 4px;
    }
</style>
