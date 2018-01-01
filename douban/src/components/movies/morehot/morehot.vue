<template>
    <div id="moremovies">
        <h1>影院热映</h1>
        <list-view :List="HotMovies" :isMovie="true" :isMore="true"></list-view>
    </div>
</template>

<script>
    import ListView from '../../../base/listview/listview'
    import { getHotMovies } from '../../../api/movie'

    const Count = 99
    export default {
        components: {
            ListView,
        },
        data () {
            return {
                HotMovies: [],
            }
        },
        methods: {
            _getHotMovies () {
                getHotMovies(Count).then((res) => {       
                    this.HotMovies = res.subject_collection_items   
                })
            },
        },
        created () {
            this._getHotMovies()
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

