<template>
    <div id="morebooks">
        <h1>非虚幻类</h1>
        <list-view :List="listUnFiction" :isMovie="false" :isMore="true"></list-view>
    </div>
</template>

<script>
    import ListView from '../../../base/listview/listview'
    import {  getUnFiction } from '../../../api/books'

    const Count = 99
    export default {
        components: {
            ListView,
        },
        data () {
            return {
                listUnFiction: [],
            }
        },
        methods: {
            _getUnFiction () {
                getUnFiction(Count).then((res) => {
                    this.listUnFiction = res.subject_collection_items
                })
            }
        },
        created () {
            this._getUnFiction()
        }
    }
</script>

<style lang="scss" scoped>
    #moremovies {
        h1 {
            font: {
                size: 1rem;
                weight: 700;
            }
        }
    }
</style>
