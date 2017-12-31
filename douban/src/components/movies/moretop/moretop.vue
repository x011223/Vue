<template>
    <div id="moremovies">
        <h1>榜单250</h1>
        <list-view :List="Top250" :isMovie="true" :isMore="true"></list-view>
    </div>
</template>

<script>
    import ListView from '../../../base/listview/listview'
    import { getTop250 } from '../../../api/movie'

    const Count = 99
    export default {
        components: {
            ListView,
        },
        data () {
            return {
                Top250: [],
            }
        },
        methods: {
            _getTop250 () {
                getTop250(Count).then((res) => {       
                    this.Top250 = res.subjects   
                    console.log(this.Top250)
                })
            },
        },
        created () {
            this._getTop250()
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
