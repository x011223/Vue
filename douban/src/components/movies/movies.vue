<template>
    <div id="movies">
        <div class="list-top">
            <span class="list-top-title">影院热映</span>
            <span class="list-top-more">更多</span>
        </div>
        <!-- 正在热映 列表 -->
        <div class="list-content">
            <list-view :List="HotMovies"></list-view>
        </div>
    </div>
</template>

<script>
    import ListView from '../../base/listview/listview'
    import { getHoteMovies } from '../../api/movie'

    export default {
        components: {
            ListView
        },
        data () {
            return {
                HotMovies: [],
            }
        },
        methods: {
            _getHotMovies () {
                getHoteMovies().then((res) => {  
                    this.HotMovies = res.subjects          
                    if (res.code === 200) {
                        this.HotMovies = res.subjects
                        console.log(this.HotMovies)       
                    }
                })
            },
        },
        created () {
            this._getHotMovies()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    #movies {
        position: absolute;
        top: 4rem;
        left: 0;
        right: 0;  
        .list-top {
            display: flex;
            padding: 0 .75rem;
            .list-top-title {
                flex: 1;
                font: {
                    size: $font-size-b;
                    weight: $font-weight-s;
                }
            }
            .list-top-more {

            }
        }
        .list-content {
            overflow: hidden;
        }
    }
</style>