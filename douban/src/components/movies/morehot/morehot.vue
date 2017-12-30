<template>
    <div id="moremovies">
        <h1>影院热映</h1>
        <list-view :List="HotMovies" :isMovie="true"></list-view>
    </div>
</template>

<script>
    import ListView from '../../../base/listview/listview'
    import { getHoteMovies, getFreeStream, getComingSoon, getTop250 } from '../../../api/movie'

    const Count = 35
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
                getHoteMovies(Count).then((res) => {       
                    this.HotMovies = res.subjects   
                })
            },
        },
        created () {
            this._getHotMovies()
        }
    }
</script>

<style lang="scss" scoped>

</style>

