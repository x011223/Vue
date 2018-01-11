<template>
    <div id="book">
        <span v-html="this.Book.title" class="book-title"></span>
        <div class="book-content">
            <div class="content-desc">
                <div class="desc-score">
                    <span class="score" v-html="this.Book.rating.average"></span>
                    <span class="comment" v-html="this.Book.rating.numRaters + '人评价'"></span>
                </div>
                <div class="desc-text">
                    <span v-html="this.Book.author[0] + ' / ' +
                                  this.Book.translator + ' / ' +
                                  this.Book.publisher + ' / ' + 
                                  this.Book.pages + ' / ' + 
                                  this.Book.binding + ' / ' +
                                  this.Book.price + ' / ' +
                                  this.Book.pubdate " class="text">
                    </span>
                </div>
            </div>
            <div class="content-img">
                <img :src="this.Book.images.medium" alt="">
            </div>
        </div>
        <div class="book-operator">
            <div class="operator-above">
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
        <div class="book-desc">
            <span v-html="this.Book.title + '的内容简介'" class="title"></span>
            <span v-html="this.Book.summary" class="desc">展开</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters ([
                'Book'
            ])
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #book {
        @include MovieAndBookItemPosition;
        .book-title {
            @include MovieAndBookItemTitle;
        }
        .book-content {
            @include MovieAndBookItemContent;
        }
        .book-operator {
            @include MovieAndBookItemOperator;
        }
        .book-desc {
            @include MovieAndBookItemDesc;
        }
    }
</style>
