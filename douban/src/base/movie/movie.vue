<template>
    <div id="movie">
        <span class="movie-title" v-html="this.Movie.title"></span>
        <div class="movie-content">
            <div class="content-desc">
                <div class="desc-score">
                    <span class="score" v-html="this.Movie.rating.average"></span>
                    <span class="comment" v-html="this.Movie.ratings_count + '人评价'"></span>
                </div>
                <div class="desc-text">
                    <span v-html="this.Movie.year + '年 / ' +
                                  this.Movie.countries[0] + ' / ' +
                                  this.Movie.directors[0].name + '(导演)' + ' / ' + 
                                  this.Movie.genres[0] + ' / ' + 
                                  this.Movie.genres[1] + ' / ' +
                                  this.Movie.casts[0].name + ' / ' + 
                                  this.Movie.casts[1].name + ' / ' + 
                                  this.Movie.casts[2].name" class="text">
                    </span>
                </div>
            </div>
            <div class="content-img">
                <img :src="this.Movie.images.small" alt="" width="105" height="160">
            </div>
        </div>
        <div class="movie-operator">
            <div class="movie-operator-above">
                <span class="operator-want">
                    <span class="want-text">
                        想看
                    </span>
                </span>
                <span class="operator-watched">
                    <span class="watched-text">
                        看过
                    </span>
                </span>
            </div>
            <span class="operator-open-inapp">
                <span class="open-inapp-text">
                    在APP上留下你的观影足迹
                </span>
            </span>
        </div>
        <div class="movie-desc">
            <span v-html="this.Movie.title + '的剧情简介'" class="title"></span>
            <span v-html="this.Movie.summary" class="desc">展开</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
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
        $color-movie-text: #aaa;
        .movie-title {
            display: block;
            margin: 1.67rem 0 0 1rem;
            font: {
                size: $font-size-X;
                weight: $font-weight-b;
            }
        }
        .movie-content {
            display: flex;
            margin: .5rem 1rem 0 1rem;
            .content-desc {
                flex: 1;
                .desc-score {
                    .comment {
                        color: $color-movie-text;
                    }
                }
                .desc-text {
                    color: #494949;
                    margin-top: 15px;
                    padding-right: 24px;
                    font-size: 14px;
                    line-height: 1.6;
                }
            }
        }
        .movie-operator {
            margin-top: 1.67rem;
            $color-operator-watch: #ffb712;
            $border-operator: 1px solid $color-operator-watch;
            @mixin OperatorText {
                padding: .53rem 4.23rem;
                border: $border-operator;
                color: $color-operator-watch;
                border-radius: 3px;
                font-size: $font-size-f;
            }
            .movie-operator-above {
                display: flex;
                .operator-want {
                    display: inline-block;
                    flex: 1;
                    margin-left: 1rem;
                    .want-text {
                        @include OperatorText;
                    }
                }
                .operator-watched {
                    display: inline-block;
                    flex: 1;
                    .watched-text {
                        @include OperatorText;
                    }
                }
            }
            .operator-open-inapp {
                display: block;
                margin: 2.33rem 0 0 1rem;
                $color-inapp: #42bd56;
                .open-inapp-text {
                    padding: .53rem 4.87rem;
                    color: $color-inapp;
                    border: 1px solid $color-inapp;
                    border-radius: 3px;
                }
            }
        }
        .movie-desc {
            margin: 3rem 1rem 0 1rem;
            width: 100%;
            .title {
                display: block;
                color: $color-movie-text;
                font-size: $font-size-f;
            }
            .desc {
                display: block;
                font-size: $font-size-f;
                color: #494949;
                margin: 1rem 1rem 0 0;
                padding-right: 1rem;
                word-wrap: break-word;
                max-width: 100%;
                max-height: 4rem;
                // overflow: hidden;
            }
        }
    }
</style>
