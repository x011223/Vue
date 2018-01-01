<template>
    <div id="moremovies">
        <h1>榜单250</h1>
        <list-view :List="FreeMovies" :isMore="true"></list-view>
    </div>
</template>

<script>
    import ListView from '../../../base/listview/listview'
    import { getFreeMovies } from '../../../api/movie'

    const Count = 99
    export default {
        components: {
            ListView,
        },
        data () {
            return {
                FreeMovies: [],
            }
        },
        methods: {
            _getFreeMovies () {
                getFreeMovies(Count).then((res) => {       
                    this.FreeMovies = res.subjects   
                    console.log(this.Top250)
                })
            },
        },
        created () {
            this._getFreeMovies()
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
