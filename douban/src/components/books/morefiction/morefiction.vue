<template>
    <div id="morebooks">
        <h1>虚幻类</h1>
        <list-view :List="listFiction" :isMovie="false" :isMore="true"></list-view>
    </div>
</template>

<script>
    import ListView from '../../../base/listview/listview'
    import {  getFiction } from '../../../api/books'

    const Count = 99
    export default {
        components: {
            ListView,
        },
        data () {
            return {
                listFiction: [],
            }
        },
        methods: {
            _getFiction () {
                getFiction(Count).then((res) => {
                    this.listFiction = res.subject_collection_items
                })
            },
        },
        created () {
            this._getFiction()
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
