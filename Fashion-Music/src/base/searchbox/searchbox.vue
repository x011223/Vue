<template>
    <div class="search-box">
        <div class="iconsearch iconfont">
            <img src="./search.svg" width="24" height="24">
        </div>
        <input ref="inputBox" id="searchBox" v-model="inputText" :placeholder="placeholder" @click="cancelShow">
        <div class="iconclear" v-show="inputText" @click="boxClear">
            <img src="./delete.svg" width="20" height="20">
        </div>
        <span class="searchCancel" v-show="isCancelShow || this.inputText" @click="cancelHide">取消</span>
    </div>
</template>

<script>
    import {debounce} from '../../js/random'

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
            blur () {
                this.$refs.inputBox.blur()
            },
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
            // this.$watch('inputText', (newInputText) => {
            //     this.$emit('inputText', newInputText)
            // })
            this.$watch('inputText', debounce((newInputText) => {
                this.$emit('inputText', newInputText)
            }, 300))
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/style.scss';  
    @import '../../sass/mixin.scss';  
    .search-box {
        @include inputNoneBorder;
        display: flex;
        align-items: center;
        padding: 8px 12px;
        margin-top: 12px;
        height: $height-big-x;
        background: $background-color-light;
        border-radius: 12px;
        #searchBox {
            flex: 1;
            width: 100%;
            text-indent: $height-big;
            height: $height-big;           
            line-height: $height-big;
            border: none;          
        }
        .iconsearch {
            position: absolute;
            padding: {
                top: 4px;
                left: 4px;
            }
            opacity: 0.4;
        }
        .iconclear {
            position: absolute;
            padding-top: 4px;
            right: 4.5rem;
        }
        .searchCancel {
            font: {
                size: $font-size-x;
                weight: 300; 
            }
            margin-left: 10px;
        }
    } 
</style>
