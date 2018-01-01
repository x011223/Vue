<template>
    <div id="moremovies">
        <h1>榜单250</h1>
        <list-view :List="NewMovies" :isMovie="true" :isMore="true"></list-view>
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
                NewMovies: [],
            }
        },
        methods: {
            _getNewMovies () {
                getNewMovies(Count).then((res) => {       
                    this.NewMovies = res.subjects   
                    console.log(this.NewMovies)
                })
            },
        },
        created () {
            this._getNewMovies()
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
