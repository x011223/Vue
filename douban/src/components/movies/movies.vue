<template>
    <div id="movies">
        <!-- 正在热映 列表 -->
        <div class="list-hotMovies">
            <div class="list-top">
                <span class="list-top-title">影院热映</span>
                <router-link class="list-top-more" to="moreHot">更多</router-link>
            </div>
            <div class="list-content">
                <list-view :List="HotMovies" :isMore="false"></list-view>
            </div>
        </div>
        <div class="list-freeMovies">
            <div class="list-top">
                <span class="list-top-title">免费在线观影</span>
                <router-link class="list-top-more" to="moreFree">更多</router-link>
            </div>
            <div class="list-content">
                <list-view :List="FreeMovies" :isMore="false"></list-view>
            </div>
        </div>
        <div class="list-newMovies">
            <div class="list-top">
                <span class="list-top-title">新片速递</span>
                <router-link class="list-top-more" to="moreNew">更多</router-link>
            </div>
            <div class="list-content">
                <list-view :List="NewMovies" :isMore="false"></list-view>
            </div>
        </div>
        <div class="instersts">
            <p>发现好电影</p>
        </div>
        <router-view></router-view>    
    </div>
</template>

<script>
    import ListView from '../../base/listview/listview'
    import { getHotMovies, getFreeMovies, getNewMovies } from '../../api/movie'
    import { mapGetters, mapMutations } from 'vuex'

    const Count = 9

    export default {
        components: {
            ListView
        },
        // data () {
        //     return {
        //         // 影院热映
        //         HotMovies: [],
        //         // 免费在线观影
        //         FreeMovies: [],
        //         // 新片速递
        //         NewMovies: [],
        //     }
        // },
        data () {
             return {
                 listHot: [],
                 listFree: [],
                 listNew: [],
             }   
        },
        methods: {
            //  获得 影院热映 列表
            _getHotMovies () {
                getHotMovies(Count).then((res) => {     
                    // this.HotMovies = res.subject_collection_items 
                    this.listHot = res.subject_collection_items  
                    this.getHotMovies(this.listHot)
                })
            },
            _getFreeMovies () {
                getFreeMovies(Count).then((res) => {
                    // this.FreeMovies = res.subject_collection_items
                    this.listFree = res.subject_collection_items
                    this.getFreeMovies(this.listFree)
                })
            },
            _getNewMovies () {
                getNewMovies(Count).then((res) => {
                    // this.NewMovies = res.subject_collection_items
                    this.listNew = res.subject_collection_items
                    this.getNewMovies(this.listNew)
                })
            },
            ...mapMutations({
                getHotMovies: 'get_HotMovies',
                getFreeMovies: 'get_FreeMovies',
                getNewMovies: 'get_NewMovies',
            })
        },
        created () {
            this._getHotMovies()
            this._getFreeMovies()
            this._getNewMovies()
        },
        computed: {
            ...mapGetters ([
                'HotMovies',
                'FreeMovies',
                'NewMovies',
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #movies {
        position: relative;
        top: 1rem;
        left: 0;
        right: 0;  
        .list-hotMovies {
            @include listLine;
        }
        .list-freeMovies {
            @include listLine;
        }
        .list-newMovies {
            @include listLine;
        }
    }
</style>