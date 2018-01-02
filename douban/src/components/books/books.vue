<template>
    <div id="books">
        <div class="list-fiction">
            <div class="list-top">
                <h2 class="list-top-title">最受关注图书 | 虚构类</h2>
                <router-link class="list-top-more" to="moreFiction">更多</router-link>
            </div>
            <list-view :List="listFiction" :isMore="false"></list-view>
        </div>
        <div class="list-unfiction">
            <div class="list-top">
                <h2 class="list-top-title">最受关注图书 | 虚构类</h2>
                <router-link class="list-top-more" to="moreUnFiction">更多</router-link>
            </div>
            <list-view :List="listUnFiction" :isMore="false"></list-view>
        </div>
    </div>
</template>

<script>
    import ListView from '../../base/listview/listview'
    import { getFiction, getUnFiction } from '../../api/books'
 
    export default {
        components: {
            ListView,
        },
        data () {
            return {
                listFiction: [],
                listUnFiction: [],
            }
        },
        methods: {
            _getFiction () {
                getFiction().then((res) => {
                    this.listFiction = res.subject_collection_items
                })
            },
            _getUnFiction () {
                getUnFiction().then((res) => {
                    this.listUnFiction = res.subject_collection_items
                })
            }
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