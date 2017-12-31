<template>
    <div id="moremovies">
        <h1>榜单250</h1>
        <list-view :List="ComingSoonMovies" :isMovie="true" :isMore="true"></list-view>
    </div>
</template>

<script>
    import ListView from '../../../base/listview/listview'
    import { getTop250 } from '../../../api/movie'
    import {  getComingSoon } from '../../../api/movie'

    const Count = 99
    export default {
        components: {
            ListView,
        },
        data () {
            return {
                ComingSoonMovies: [],
            }
        },
        methods: {
            _getComingSoon () {
                getComingSoon(Count).then((res) => {       
                    this.ComingSoonMovies = res.subjects   
                    console.log(this.Top250)
                })
            },
        },
        created () {
            this._getComingSoon()
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
