<template>
    <div id="books">
        <div class="list-fiction">
            <h2>最受关注图书 | 虚构类</h2>
            <list-view :List="listFiction" :isMovie="false"></list-view>
        </div>
        <div class="list-unfiction">
            <h2>最受关注图书 | 非虚构类</h2>
            <list-view :List="listUnFiction" :isMovie="false"></list-view>
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
                ImgUrl: ''
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
    @mixin H2 {
        h2 {
            font: {
                size: 1rem;
                weight: 300;
            }
            margin-top: 1rem;
        }   
    }
    #books {
        overflow: hidden;
        padding: 0 1rem;
        .list-fiction {
            @include H2;
        }
        .list-unfiction {
            @include H2;
        }
    }
</style>