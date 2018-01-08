<template>
    <div id="movie">
        <span class="movie-title" v-html="this.Movie.title"></span>
        <div class="movie-content">
            <div class="content-desc">
                <div class="desc-score">
                    <span class="score" v-html="this.Movie.rating.value"></span>
                    <span class="comment" v-html="this.Movie.rating.count"></span>
                </div>
                <div class="desc-text">
                    <span v-html="this.Movie.directors[0] + '(导演)' + '/' + 
                                  this.Movie.actors[0] + '/' + 
                                  this.Movie.actors[1] + '/' + 
                                  this.Movie.actors[2]">
                    </span>
                </div>
            </div>
            <div>
                <img :src="this.Movie.cover.url" alt="" width="110" height="150">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                rating: [],
            }
        },
        computed: {
            ...mapGetters ([
                'Movie'
            ])
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #movie  {
        position: fixed;
        top: 3rem;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 15;
        background: #fff;
        .movie-title {
            display: block;
            margin: 1.67rem 0 0 1rem;
            font: {
                size: $font-size-X;
                weight: $font-weight-b;
            }
        }
    }
</style>
