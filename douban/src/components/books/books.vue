<template>
    <div id="books">
        <div class="list-fiction">
            <div class="list-top">
                <h2 class="list-top-title">最受关注图书 | 虚构类</h2>
                <span class="list-top-more" @click="moreFiction">更多</span>
            </div>
            <list-view :List="FictionBooks" :isMore="false"></list-view>
        </div>
        <div class="list-unfiction">
            <div class="list-top">
                <h2 class="list-top-title">最受关注图书 | 虚构类</h2>
                <span class="list-top-more" @click="moreUnFiction">更多</span>
            </div>
            <list-view :List="UnFictionBooks" :isMore="false"></list-view>
        </div>
    </div>
</template>

<script>
    import { ListMixin } from '../../assets/js/mixins'
    import {asdd} from '../../api/books'
    export default {
        mixins: [ ListMixin ],
        methods: {
            moreFiction () {
                this.setIsMore(true)
                this.$router.push(
                    { path: '/moreFiction' }
                )
            },
            moreUnFiction () {
                this.setIsMore(true)
                this.$router.push(
                    { path: '/moreUnFiction'}
                )
            },         
        },
        created () {
            this._getFiction()
            this._getUnFiction()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    @mixin H2 {
        h2 {
            font: {
                size: 1rem;
                weight: 300;
            }
        }   
    }
    #books {
        position: relative;
        top: 1rem;
        left: 0;
        right: 0; 
        .list-fiction {
            @include H2;
            @include listLine;
        }
        .list-unfiction {
            @include H2;
            @include listLine;
        }
    }
</style>