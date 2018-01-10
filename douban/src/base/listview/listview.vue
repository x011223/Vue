<template>
    <div id="listView">
        <ul :class="this.isMore ? 'listItemMore' : 'listItemLess'">
            <li v-for="(listItem, index ) in List" @click.stop.prevent="toListItem(listItem)">
                <a :href="listItem.url" class="listItem-img">
                    <img v-lazy="listItem.cover.url" alt="">
                </a>
                <span class="listItem-name" v-html="listItem.title"></span>
                <span class="listItem-score" v-html="itemScore(listItem)"></span>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script> 
    import { mapMutations, mapGetters } from "vuex"
    import { getMovieItem } from '../../api/movie'
    import { getBookItem } from '../../api/books'

    export default {
        data () {
            return {
                movieItem: [],
                bookItem: [],
            }
        },
        props: {
            List: {
                type: Array,
                default: []
            },
            isMore: {
                type: Boolean,
                default: false
            }
        }, 
        methods: {
            // 显示 电影 或者 图书 评分
            itemScore (listItem) {
                if (!listItem.rating || listItem.rating.value < 0) {
                    return '暂无评分'
                }
                if (listItem.rating.value > 0) {
                    return listItem.rating.value
                }           
            },
            // 点击 某个电影 或者 图书， 转到相应详情页面
            toListItem (listItem) {
                if (listItem.type === "movie") {
                    getMovieItem(listItem.id).then((res) => {
                        this.movieItem = res
                        this.$router.push(
                            { path: `/movies/${this.movieItem.id}` }
                        )
                        this.setMovie(this.movieItem)
                        console.log(this.Movie)
                    })                
                }
                if (listItem.type === "book") {
                    getBookItem(listItem.id).then((res) => {
                        this.bookItem = res
                        this.$router.push(
                            { path: `${this.bookItem.id}` }
                        )
                        this.setBook(this.bookItem)
                        console.log(this.Book)
                    })     
                }
            },
            ...mapMutations ({
                setMovie: 'set_Movie',
                setBook: 'set_Book',
            })
        },
        computed: {
            ...mapGetters ([
                'Movie',
                'Book',
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/_mixins.scss';
    $height-img: 145px;
    $width-img: 100px;
    #listView {
        margin-top: 1rem;
        margin-left: 1rem;
        .listItemLess {
            flex: 1;
            overflow: hidden;
            display: flex;           
            li {
                list-style: none;
                padding: 0 .53rem;
                text-align: center;
                .listItem-img {
                    img {
                        width: $width-img;
                        height: $height-img;
                    }
                }
                .listItem-name {
                    display: block;
                    @include TextFlow;
                    max-width: $width-img;
                }
                .listItem-score {
                    text-align: center;
                    @include TextFlow;
                    max-width: $width-img;
                }
            }
        }
        .listItemMore {
            li {
                display: inline-block;
                text-align: center;
                padding: 0 .37rem;
                list-style: none;
                margin-bottom: 1rem;
                .listItem-img {
                    display: flex;
                    img {
                        width: $width-img;
                        height: $height-img;
                    }
                }
                .listItem-name {
                    @include TextFlow;
                    text-align: center;
                    max-width: $width-img;
                    display: block;
                }
                .listItem-score {
                    @include TextFlow;
                    text-align: center;
                    max-width: $width-img;
                }
            }
        }
    }
</style>
